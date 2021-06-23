import { Request, Response } from 'express';
import Board, { BoardsInDB } from '../models/board';
import Column from '../models/column';
import { PassportUser } from '../../types/types';

const getAllBoards = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.user as PassportUser;

  try {
    const ownBoards = await Board.find({ owner: _id });
    const sharedBoards = await Board.find().where('accessUsers').in([_id]);
    const filteredOwnBoardObj = ownBoards.length
      ? ownBoards.map((el) => ({
          id: el._id,
          name: el.name
        }))
      : ownBoards;
    const filteredSharedBoardObj = sharedBoards.length
      ? sharedBoards.map((el) => ({
          id: el._id,
          name: el.name
        }))
      : sharedBoards;
    res.status(200).json({ ownBoards: filteredOwnBoardObj, sharedBoards: filteredSharedBoardObj });
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
      owner: userId
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
  const { boardId, newName, userId } = req.body;

  try {
    const board = await Board.findById(boardId);
    const isOwnerId = board?.owner.toString() === userId;
    if (isOwnerId) {
      const { id, name } = (await Board.findByIdAndUpdate(
        boardId,
        { name: newName },
        { new: true }
      )) as BoardsInDB;
      res.status(200).json({ id, name });
    }
    res.status(400).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

const shareBoard = async (req: Request, res: Response): Promise<void> => {
  const { boardId, userId } = req.body;
  try {
    const sharedBoard = await Board.findById(boardId);
    const arrayOfAccessUsers = sharedBoard?.accessUsers;
    if (arrayOfAccessUsers) {
      const isUserExist = arrayOfAccessUsers.includes(userId);
      if (isUserExist) {
        res.status(409).json({ message: 'the user has already existed' });
      } else {
        await Board.findByIdAndUpdate(boardId, { accessUsers: [...arrayOfAccessUsers, userId] });
        res.status(204).end();
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
    const isOwnerId = board?.owner.toString() === userId;

    if (isOwnerId) {
      await Column.findOneAndDelete({ boardId });
      await Board.findByIdAndDelete(boardId);
    } else {
      const updatedUsersArr = board?.accessUsers.filter((el) => el.toString() !== userId);
      await Board.findByIdAndUpdate(boardId, { accessUsers: updatedUsersArr });
    }
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
};

export { getAllBoards, createNewBoard, updateBoardName, shareBoard, deleteBoard };
