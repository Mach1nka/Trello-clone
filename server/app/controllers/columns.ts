import { Request, Response } from 'express';
import Column, { ColumnsInDB, ColumnData } from '../models/column';

const getColumns = async (req: Request, res: Response): Promise<void> => {
  const { boardId } = req.params;
  try {
    const columnsContainer = await Column.findOne({ boardId });
    if (columnsContainer) {
      res.status(200).json({ id: columnsContainer._id, columns: columnsContainer.columns });
    } else {
      res.status(404).json({ message: 'columns have not been found' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const createNewColumn = async (req: Request, res: Response): Promise<void> => {
  const { boardId, name, position } = req.body;
  const newColumn: { name: string; position: number } = { name, position: Number(position) };
  try {
    const isColumnCreated = await Column.exists({ boardId });
    if (isColumnCreated) {
      await Column.findOneAndUpdate(
        { boardId },
        { $addToSet: { columns: newColumn } },
        { new: true, lean: true },
        (_err, model) => {
          const createdColumn = model?.columns.pop() as ColumnData;
          res.status(201).json({ _id: createdColumn._id, ...newColumn });
        }
      );
    } else {
      const column = new Column({
        boardId,
        columns: [newColumn]
      });
      await column.save((_err, model) => {
        res.status(201).json({ id: model._id, columns: model.columns });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateColumnName = async (req: Request, res: Response): Promise<void> => {
  const { columnsContainerId, columnId, newName } = req.body;
  try {
    await Column.findById(columnsContainerId).exec(async (_err, data) => {
      if (data) {
        const updatedColumns = data.columns.map((el) =>
          el._id.toString() === columnId
            ? { _id: el._id, name: newName, position: el.position }
            : el
        );
        await Column.findByIdAndUpdate(columnsContainerId, { columns: updatedColumns });
        const renamedColumn = updatedColumns.find((el) => el._id.toString() === columnId);
        res.status(200).json(renamedColumn);
      } else {
        res.status(404).json({ message: 'the column has not been found' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateColumnPosition = async (req: Request, res: Response): Promise<void> => {
  const { columnId, columnsContainerId, newPosition } = req.body;
  try {
    await Column.findById(columnsContainerId).exec(async (_err, data) => {
      if (data) {
        const columnsArr = data.columns;
        const indexOldEl = columnsArr.findIndex((el) => el._id.toString() === columnId) as number;
        const editableEl = columnsArr.find((el) => el._id.toString() === columnId) as ColumnData;

        if (editableEl.position < newPosition) {
          columnsArr.splice(+newPosition + 1, 0, editableEl);
          columnsArr.splice(indexOldEl, 1);
        } else {
          columnsArr.splice(+newPosition, 0, editableEl);
          columnsArr.splice(indexOldEl + 1, 1);
        }

        const updatedColumns = columnsArr.map((el, idx) => ({
          _id: el._id,
          name: el.name,
          position: idx
        }));
        const { id, columns } = (await Column.findByIdAndUpdate(
          columnsContainerId,
          { columns: updatedColumns },
          { new: true }
        )) as ColumnsInDB;
        res.status(200).json({ id, columns });
      } else {
        res.status(404).json({ message: 'the column has not been found' });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const deleteColumn = async (req: Request, res: Response): Promise<void> => {
  const { columnId, columnsContainerId } = req.body;
  try {
    await Column.findById(columnsContainerId).exec(async (_err, data) => {
      if (data) {
        const sortedColumns = data.columns.filter((el) => el._id.toString() !== columnId);
        const elementsWithUpdatedPos = sortedColumns.map((el, idx) => ({
          _id: el._id,
          name: el.name,
          position: idx
        }));
        await Column.findByIdAndUpdate(columnsContainerId, { columns: elementsWithUpdatedPos });
      }
      res.status(204).end();
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export { getColumns, createNewColumn, updateColumnName, updateColumnPosition, deleteColumn };
