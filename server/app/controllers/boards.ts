import { Request, Response } from 'express';
import Board, { BoardInDB } from '../models/board';
import Column from '../models/column';
import { PassportUser } from '../types/types';

const getAllBoards = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.user as PassportUser;
  try {
    const userBoards = await Board.find({ user: _id });
    const filteredBoardObj = userBoards.length
      ? userBoards.map((el) => ({
          id: el._id,
          name: el.name
        }))
      : userBoards;
    res.status(200).json({ boards: filteredBoardObj });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const createNewBoard = async (req: Request, res: Response): Promise<void> => {
  const { userId, name } = req.body;
  try {
    const board = new Board({
      name,
      user: userId
    });
    await board.save((_err, model) => {
      res.status(201).json({ name, id: model._id });
    });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const updateBoardName = async (req: Request, res: Response): Promise<void> => {
  const { boardId, newName } = req.body;
  try {
    const { id, name } = (await Board.findOneAndUpdate(
      { _id: boardId },
      { name: newName },
      { new: true }
    )) as BoardInDB;
    res.status(200).json({ id, name });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const deleteBoard = async (req: Request, res: Response): Promise<void> => {
  const { boardId, userId } = req.body;
  try {
    await Column.findOneAndDelete({ boardId });
    await Board.findOneAndDelete({ _id: boardId, user: userId });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export { getAllBoards, createNewBoard, updateBoardName, deleteBoard };
