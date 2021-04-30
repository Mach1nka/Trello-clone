import { Request, Response } from 'express';
import Board from '../models/board';

interface NewBoard {
  _id: string;
  name: string;
  user: string;
  __v: number;
}

interface PassportUser {
  _id: string;
  login: string;
}

const getAllBoards = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.user as PassportUser;
  try {
    const boards = await Board.find({ user: _id });
    res.status(200).json(boards);
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
    await board.save((_err: TypeError, model: NewBoard) => {
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
    await Board.findOneAndUpdate({ _id: boardId }, { name: newName });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const deleteBoard = async (req: Request, res: Response): Promise<void> => {
  const { boardId, userId } = req.body;
  try {
    await Board.remove({ _id: boardId, user: userId });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export { getAllBoards, createNewBoard, updateBoardName, deleteBoard };
