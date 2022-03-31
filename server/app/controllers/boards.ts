import { Response } from 'express';
import { validationResult } from 'express-validator';

import BaseResponse from '../../utils/base-response';
import BadRequest from '../../utils/errors/bad-request';
import getUserPayload from '../../utils/get-user-payload';
import {
  getBoardsService,
  createBoardService,
  updateNameService,
  shareBoardService,
  deleteService
} from '../services/boards';
import { CustomRequest, Empty } from '../../types/common';
import {
  AccessibleBoardsResponse,
  BoardResponse,
  BodyForCreating,
  ParamsForDeleting,
  BodyForRenaming,
  BodyForSharing
} from '../../types/boards/interfaces';
import { UserRole } from '../../types/auth/interfaces';

const getAllBoards = async (req: CustomRequest, res: Response) => {
  const { userId } = getUserPayload(req);
  const { ownBoards, sharedBoards } = await getBoardsService({ userId });

  res.json(new BaseResponse<AccessibleBoardsResponse>({ ownBoards, sharedBoards }));
};

const createNewBoard = async (req: CustomRequest<BodyForCreating>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { userId } = getUserPayload(req);
  const { id, name } = await createBoardService({ ...req.body, userId });

  res.status(201).json(new BaseResponse<BoardResponse>({ id, name }, 201));
};

const updateBoardName = async (req: CustomRequest<BodyForRenaming>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const userRole = req.userRole as UserRole;
  const { userId } = getUserPayload(req);
  const { id, name } = await updateNameService({ ...req.body, userId, userRole });

  res.json(new BaseResponse<BoardResponse>({ id, name }));
};

const shareBoard = async (req: CustomRequest<BodyForSharing>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const userRole = req.userRole as UserRole;
  await shareBoardService({ ...req.body, userRole });

  res.json(new BaseResponse<Empty>({}));
};

const deleteBoard = async (req: CustomRequest<Empty, ParamsForDeleting>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { boardId } = req.params;
  const userRole = req.userRole as UserRole;
  const { userId } = getUserPayload(req);

  await deleteService({ boardId, userId, userRole });

  res.json(new BaseResponse<Empty>({}));
};

export { getAllBoards, createNewBoard, updateBoardName, shareBoard, deleteBoard };
