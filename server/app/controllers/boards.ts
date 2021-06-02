import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Board, { BoardsInDB } from '../models/board';
import Column from '../models/column';
import { PassportUser } from '../types/types';

const getAllBoards = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.user as PassportUser;
  const id = mongoose.Types.ObjectId(_id);
  try {
    const userBoards = await Board.find().where('users').in([id]);
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
      users: [userId]
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
    const { id, name } = (await Board.findByIdAndUpdate(
      boardId,
      { name: newName },
      { new: true }
    )) as BoardsInDB;
    res.status(200).json({ id, name });
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const shareBoard = async (req: Request, res: Response): Promise<void> => {
  const { boardId, newUserId } = req.body;
  try {
    const sharedBoard = await Board.findById(boardId);
    const arrayOfUsers = sharedBoard?.users;
    if (arrayOfUsers) {
      const isUserExist = arrayOfUsers.includes(newUserId);
      if (isUserExist) {
        res.status(409).json({ message: 'the user has already existed' });
      } else {
        const { id, name } = (await Board.findByIdAndUpdate(
          boardId,
          { users: [...arrayOfUsers, newUserId] },
          { new: true }
        )) as BoardsInDB;
        res.status(200).json({ id, name });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const deleteBoard = async (req: Request, res: Response): Promise<void> => {
  const { boardId, userId } = req.body;

  try {
    const board = await Board.findById(boardId);
    const newUsers = board?.users.filter((el) => el.toString() !== userId);

    if (newUsers && newUsers.length) {
      await Board.findByIdAndUpdate(boardId, { users: newUsers });
    } else {
      await Column.findOneAndDelete({ boardId });
      await Board.findByIdAndDelete(boardId);
    }
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export { getAllBoards, createNewBoard, updateBoardName, shareBoard, deleteBoard };
