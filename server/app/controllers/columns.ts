import { Response } from 'express';
import { validationResult } from 'express-validator';

import {
  getColumnsService,
  createColumnService,
  updateNameService,
  updatePositionService,
  deleteService
} from '../services/columns';
import { CustomRequest, Empty } from '../../types/common';
import BaseResponse from '../../utils/base-response';
import BadRequest from '../../utils/errors/bad-request';
import {
  BodyForCreating,
  BodyForRenaming,
  BodyForReposition,
  ParamsForDeleting,
  ParamsForGetting,
  ColumnResponse
} from '../../types/columns/interfaces';
import { BoardColumn as Column } from '../entities/column';

const getColumns = async (req: CustomRequest<Empty, ParamsForGetting>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }
  const { boardId } = req.params;

  const columns: Column[] = await getColumnsService({ boardId });

  const mappedColumns: ColumnResponse[] = columns.map((el) => ({
    ...el,
    boardId
  }));

  res.json(new BaseResponse<{ columns: ColumnResponse[] }>({ columns: mappedColumns }));
};

const createNewColumn = async (req: CustomRequest<BodyForCreating>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { id, name, position, board } = await createColumnService(req.body);

  res
    .status(201)
    .json(new BaseResponse<ColumnResponse>({ id, name, position, boardId: board.id }, 201));
};

const updateColumnName = async (req: CustomRequest<BodyForRenaming>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { id, name, position, board } = await updateNameService(req.body);

  res.json(new BaseResponse<ColumnResponse>({ id, name, position, boardId: board.id }));
};

const updateColumnPosition = async (req: CustomRequest<BodyForReposition>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const columns: Column[] = await updatePositionService(req.body);

  const mappedColumns: ColumnResponse[] = columns.map((el) => ({
    ...el,
    boardId: req.body.boardId
  }));

  res.json(new BaseResponse<{ columns: ColumnResponse[] }>({ columns: mappedColumns }));
};

const deleteColumn = async (req: CustomRequest<Empty, ParamsForDeleting>, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  await deleteService(req.params);

  res.json(new BaseResponse<Empty>({}));
};

export { getColumns, createNewColumn, updateColumnName, updateColumnPosition, deleteColumn };
