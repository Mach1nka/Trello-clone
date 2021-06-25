import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import BaseResponse from '../../utils/base-response';
import BadRequest from '../../utils/errors/bad-request';
import {
  getBoardsService,
  createBoardService,
  updateNameService,
  shareBoardService,
  deleteService
} from '../services/boards';
import { PassportUser } from '../../types/types';

const getAllBoards = async (req: Request, res: Response): Promise<void> => {
  const { _id } = req.user as PassportUser;
  const { filteredOwnBoardObj, filteredSharedBoardObj } = await getBoardsService(_id);

  res.json(
    new BaseResponse({ ownBoards: filteredOwnBoardObj, sharedBoards: filteredSharedBoardObj })
  );
};

const createNewBoard = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { id, name } = await createBoardService(req.body);

  res.status(201).json(new BaseResponse({ id, name }, 201));
};

const updateBoardName = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { id, name } = await updateNameService(req.body);

  res.json(new BadRequest({ id, name }));
};

const shareBoard = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  await shareBoardService(req.body);

  res.status(204).json(new BaseResponse({}, 204));
};

const deleteBoard = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  await deleteService(req.body);
  res.status(204).json(new BaseResponse({}, 204));
};

export { getAllBoards, createNewBoard, updateBoardName, shareBoard, deleteBoard };
