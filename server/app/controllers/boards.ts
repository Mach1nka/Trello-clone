import { Request, Response } from 'express';
import Board, { BoardsInDB } from '../models/board';
import Column from '../models/column';
import { PassportUser } from '../types/types';

const getAllBoards = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.user as PassportUser;

  try {
    const ownBoards = await Board.find({ owner: _id });
    const sharedBoards = await Board.find().where('accessUsers').in([_id]);
    const allBoards = [...ownBoards, ...sharedBoards];
    const filteredBoardObj = allBoards.length
      ? allBoards.map((el) => ({
          id: el._id,
          name: el.name
        }))
      : allBoards;
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
    const arrayOfAccessUsers = sharedBoard?.accessUsers;
    if (arrayOfAccessUsers) {
      const isUserExist = arrayOfAccessUsers.includes(newUserId);
      if (isUserExist) {
        res.status(409).json({ message: 'the user has already existed' });
      } else {
        const { id, name } = (await Board.findByIdAndUpdate(
          boardId,
          { accessUsers: [...arrayOfAccessUsers, newUserId] },
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
    const isOwnerId = board?._id.toString() === userId;

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
