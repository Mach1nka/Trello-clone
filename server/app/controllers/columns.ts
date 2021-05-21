import { Request, Response } from 'express';
import Column, { ColumnsInDB } from '../models/column';
import Card from '../models/card';

const getColumns = async (req: Request, res: Response): Promise<void> => {
  const { boardId } = req.params;
  try {
    const columnsArr = await Column.find({ boardId });
    if (columnsArr.length) {
      const preparedArr = columnsArr.map((el) => ({
        id: el._id,
        name: el.name,
        position: el.position,
        boardId: el.boardId
      }));
      res.status(200).json(preparedArr);
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
    const columnsData = await Column.find({ boardId });
    if (columnsData) {
      columnsData.sort((a, b) => a.position - b.position);
      columnsData.push(newColumn);
      const elementsWithUpdatedPos = columnsData.map((el, idx) => ({
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

        const elementsWithUpdatedPos = data.map((el, idx) => ({
          _id: el._id,
          boardId: el.boardId,
          name: el.name,
          position: idx
        }));
        await Column.deleteMany({ boardId });
        await Column.insertMany(elementsWithUpdatedPos);
        const preparedArr = elementsWithUpdatedPos.map((el) => ({
          id: el._id,
          name: el.name,
          position: el.position,
          boardId: el.boardId
        }));
        res.status(200).json(preparedArr);
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
        await Card.deleteMany({ columnId });
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
