import { Request, Response } from 'express';
import Column, { ColumnInDB } from '../models/column';

const getColumns = async (req: Request, res: Response): Promise<void> => {
  const { boardId } = req.params;
  try {
    const columns = await Column.findOne({ board: boardId });
    res.status(200).json({ columns });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const createNewColumn = async (req: Request, res: Response): Promise<void> => {
  const { boardId, name, position } = req.body;
  const newColumn = { name, position };
  try {
    const createdColumn = await Column.exists({ boardId });
    if (createdColumn) {
      await Column.findOneAndUpdate(
        { boardId },
        { $addToSet: { columns: newColumn } },
        { new: true, lean: true },
        (_err, model) => {
          const sortedColumns = model?.columns.sort((a, b) => a.position - b.position);
          res.status(201).json({ id: model?._id, columns: sortedColumns });
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
  const { columnId, boardId, newName } = req.body;
  try {
    const { id, columns } = (await Column.findOneAndUpdate(
      { boardId, _id: columnId },
      { name: newName },
      { new: true }
    )) as ColumnInDB;
    res.status(200).json({ id, columns });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateColumnPosition = async (req: Request, res: Response): Promise<void> => {
  const { columnId, newPosition } = req.body;
  try {
    const { id, columns } = (await Column.findOneAndUpdate(
      { _id: columnId },
      { position: newPosition },
      { new: true }
    )) as ColumnInDB;
    res.status(200).json({ id, columns });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const deleteColumn = async (req: Request, res: Response): Promise<void> => {
  const { columnId, boardId } = req.body;
  try {
    await Column.findOneAndDelete({ _id: columnId, board: boardId });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export { getColumns, createNewColumn, updateColumnName, updateColumnPosition, deleteColumn };
