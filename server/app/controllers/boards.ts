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
import getUserPayload from '../../utils/get-user-payload';

const getAllBoards = async (req: Request, res: Response): Promise<void> => {
  const { userId } = getUserPayload(req);

  const { ownBoards, sharedBoards } = await getBoardsService(userId);

  res.json(new BaseResponse({ ownBoards, sharedBoards }));
};

const createNewBoard = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { userId } = getUserPayload(req);
  const { name: boardName } = req.body;

  const { id, name } = await createBoardService({ name: boardName, userId });

  res.status(201).json(new BaseResponse({ id, name }, 201));
};

const updateBoardName = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { userId } = getUserPayload(req);
  const { newName, boardId } = req.body;

  const { id, name } = await updateNameService({ newName, boardId, userId });

  res.json(new BaseResponse({ id, name }));
};

const shareBoard = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { boardId, newParticipantId } = req.body;

  await shareBoardService({ boardId, newParticipantId });

  res.status(200).json(new BaseResponse({}, 200));
};

const deleteBoard = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { userId } = getUserPayload(req);
  const { boardId } = req.body;

  await deleteService({ userId, boardId });
  res.status(200).json(new BaseResponse({}, 200));
};

export { getAllBoards, createNewBoard, updateBoardName, shareBoard, deleteBoard };
