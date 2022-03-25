import { Response } from 'express';
import { validationResult } from 'express-validator';

import { CustomRequest, Empty } from '../../types/common';
import BaseResponse from '../../utils/base-response';
import BadRequest from '../../utils/errors/bad-request';
import {
  getCardsService,
  createCardService,
  updateNameService,
  updateDescriptionService,
  updatePositionService,
  transferCardService,
  deleteService
} from '../services/cards';
import {
  ParamsForGetting,
  BodyForCreating,
  BodyForRenaming,
  BodyForUpdatingDesc,
  BodyForUpdatingPos,
  BodyForTransferringCard,
  BodyForDeleting,
  CardResponse,
  CardListResponse
} from '../../types/cards/interfaces';

const getCards = async (
  req: CustomRequest<Empty, ParamsForGetting>,
  res: Response
): Promise<void> => {
  const { columnId } = req.params;
  const cards = await getCardsService({ columnId });

  const mappedCards: CardResponse[] = cards.map((el) => ({
    ...el,
    columnId
  }));

  res.json(new BaseResponse<CardListResponse>({ columnId, cards: mappedCards }));
};

const createNewCard = async (req: CustomRequest<BodyForCreating>, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { id, name, position, description, column } = await createCardService(req.body);

  res
    .status(201)
    .json(
      new BaseResponse<CardResponse>({ id, name, position, description, columnId: column.id }, 201)
    );
};

const updateCardName = async (
  req: CustomRequest<BodyForRenaming>,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { id, name, position, description, column } = await updateNameService(req.body);

  res.json(
    new BaseResponse<CardResponse>({ id, name, position, description, columnId: column.id })
  );
};

const updateCardDescription = async (
  req: CustomRequest<BodyForUpdatingDesc>,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { id, name, position, description, column } = await updateDescriptionService(req.body);

  res.json(
    new BaseResponse<CardResponse>({ id, name, position, description, columnId: column.id })
  );
};

const updateCardPosition = async (
  req: CustomRequest<BodyForUpdatingPos>,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  const { columnId } = req.body;
  const cards = await updatePositionService(req.body);

  const mappedCards: CardResponse[] = cards.map((el) => ({
    ...el,
    columnId
  }));

  res.json(new BaseResponse<CardListResponse>({ columnId, cards: mappedCards }));
};

const transferCard = async (
  req: CustomRequest<BodyForTransferringCard>,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  await transferCardService(req.body);

  res.status(200).json(new BaseResponse<Empty>({}, 200));
};

const deleteCard = async (req: CustomRequest<BodyForDeleting>, res: Response): Promise<void> => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new BadRequest(errors.array());
  }

  await deleteService(req.body);

  res.status(200).json(new BaseResponse<Empty>({}, 200));
};

export {
  getCards,
  createNewCard,
  updateCardName,
  updateCardDescription,
  updateCardPosition,
  transferCard,
  deleteCard
};
