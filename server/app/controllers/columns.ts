import { Request, Response } from 'express';
import Column, { ColumnsInDB } from '../models/column';

const getColumns = async (req: Request, res: Response): Promise<void> => {
  const { boardId } = req.params;
  try {
    const columnsArr = await Column.find({ boardId });
    if (columnsArr) {
      const configObj = columnsArr.map((el) => ({
        id: el._id,
        name: el.name,
        position: el.position,
        boardId: el.boardId
      }));
      res.status(200).json({ ...configObj });
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
  const newColumn = new Column({
    boardId,
    name,
    position: Number(position)
  });

  try {
    const columns = await Column.find({ boardId });
    if (columns) {
      columns.sort((a, b) => a.position - b.position);
      columns.push(newColumn);
      const elementsWithUpdatedPos = columns.map((el, idx) => ({
        _id: el._id,
        name: el.name,
        position: idx,
        boardId: el.boardId
      }));
      await Column.deleteMany({ boardId });
      await Column.insertMany(elementsWithUpdatedPos);
      const createdColumn = (await Column.findById(newColumn._id)) as ColumnsInDB;
      res.status(201).json({
        id: createdColumn._id,
        boardId: createdColumn.boardId,
        name: createdColumn.name,
        position: createdColumn.position
      });
    } else {
      await newColumn.save((_err, data) => {
        res.status(201).json({
          id: data._id,
          boardId: data.boardId,
          name: data.name,
          position: data.position
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateColumnName = async (req: Request, res: Response): Promise<void> => {
  const { columnId, newName } = req.body;
  try {
    await Column.findByIdAndUpdate(columnId, { name: newName }, { new: true }, (_err, data) => {
      if (!data) {
        res.status(404).json({ message: 'the column has not been found' });
      } else {
        res.status(200).json({
          id: data._id,
          boardId: data.boardId,
          name: data.name,
          position: data.position
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateColumnPosition = async (req: Request, res: Response): Promise<void> => {
  const { columnId, boardId, newPosition } = req.body;
  try {
    await Column.find({ boardId }, async (_err, data) => {
      if (data) {
        const indexOldEl = data.findIndex((el) => el._id.toString() === columnId) as number;
        const editableEl = data.find((el) => el._id.toString() === columnId) as ColumnsInDB;

        if (editableEl.position < newPosition) {
          data.splice(+newPosition + 1, 0, editableEl);
          data.splice(indexOldEl, 1);
        } else {
          data.splice(+newPosition, 0, editableEl);
          data.splice(indexOldEl + 1, 1);
        }

        const updatedColumns = data.map((el, idx) => ({
          _id: el._id,
          boardId: el.boardId,
          name: el.name,
          position: idx
        }));
        await Column.deleteMany({ boardId });
        await Column.insertMany(updatedColumns, { lean: true }, (err, model) => {
          if (err) {
            res.status(500).end();
          } else {
            res.status(200).json(model);
          }
        });
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
  const { columnId, boardId } = req.body;
  try {
    await Column.findByIdAndDelete(columnId);
    await Column.find({ boardId }, async (_err, data) => {
      if (data) {
        const elementsWithUpdatedPos = data.map((el, idx) => ({
          _id: el._id,
          boardId: el.boardId,
          name: el.name,
          position: idx
        }));
        await Column.deleteMany({ boardId });
        await Column.insertMany(elementsWithUpdatedPos);
      }
      res.status(204).end();
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export { getColumns, createNewColumn, updateColumnName, updateColumnPosition, deleteColumn };
