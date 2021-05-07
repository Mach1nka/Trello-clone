import { Request, Response } from 'express';
import Column from '../models/column';

interface ColumnInDB {
  _id: string;
  name: string;
  board: string;
  position: number;
  __v: number;
}

const getColumns = async (req: Request, res: Response): Promise<void> => {
  const { boardId } = req.params;
  try {
    const columns: ColumnInDB[] = await Column.find({ board: boardId });
    const filteredColumnsObj = columns.length
      ? columns.map((el: ColumnInDB) => ({
          id: el._id,
          name: el.name,
          board: el.board,
          position: el.position
        }))
      : columns;
    res.status(200).json({ columns: filteredColumnsObj });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const createNewColumn = async (req: Request, res: Response): Promise<void> => {
  const { boardId, name, position } = req.body;
  try {
    const column = new Column({
      board: boardId,
      name,
      position
    });
    await column.save((_err: TypeError, model: ColumnInDB) => {
      res.status(201).json({ name, id: model._id, board: boardId, position });
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateColumnName = async (req: Request, res: Response): Promise<void> => {
  const { columnId, newName } = req.body;
  try {
    const { id, name, position } = await Column.findOneAndUpdate(
      { _id: columnId },
      { name: newName },
      { new: true }
    );
    res.status(200).json({ id, name, position });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateColumnPosition = async (req: Request, res: Response): Promise<void> => {
  const { columnId, newPosition } = req.body;
  try {
    const { id, name, position } = await Column.findOneAndUpdate(
      { _id: columnId },
      { position: newPosition },
      { new: true }
    );
    res.status(200).json({ id, name, position });
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
