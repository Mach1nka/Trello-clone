import { cardRepository, columnRepository } from '../database/repositories';
import { Card } from '../entities/card';
import { BoardColumn as Column } from '../entities/column';
import BadRequest from '../../utils/errors/bad-request';
import NotFound from '../../utils/errors/not-found';
import findEntity from '../../utils/find-entity';
import repositionEntity from '../../utils/reposition-entity';
import {
  ParamsForGetting,
  BodyForCreating,
  BodyForRenaming,
  BodyForUpdatingDesc,
  BodyForUpdatingPos,
  BodyForTransferringCard,
  ParamsForDeleting
} from '../../types/cards/interfaces';

const getCardsService = async (data: ParamsForGetting): Promise<Card[]> => {
  const { columnId } = data;
  const cards: Card[] = await cardRepository().find({
    where: { column: { id: columnId } },
    order: { position: 'ASC' }
  });

  return cards;
};

const createCardService = async (data: BodyForCreating): Promise<Card> => {
  const { columnId, name, description = '' } = data;
  const column: Column | undefined = await columnRepository().findOne(columnId);

  if (!column) {
    throw new NotFound('The Column does not exist');
  }

  const numberOfCards = await cardRepository().count({
    where: { column: { id: columnId } }
  });
  const createdCard: Card = await cardRepository().save({
    name,
    description,
    position: numberOfCards,
    column
  });

  return createdCard;
};

const updateNameService = async (data: BodyForRenaming): Promise<Card> => {
  const { cardId, newName } = data;
  const card: Card | undefined = await cardRepository().findOne(cardId, {
    relations: ['column']
  });

  if (!card) {
    throw new NotFound('Card does not exist');
  }

  const updatedCard = cardRepository().save({ ...card, name: newName });

  return updatedCard;
};

const updateDescriptionService = async (data: BodyForUpdatingDesc): Promise<Card> => {
  const { cardId, newDescription } = data;
  const card: Card | undefined = await cardRepository().findOne(cardId, {
    relations: ['column']
  });

  if (!card) {
    throw new NotFound('Card does not exist');
  }

  const updatedCard = await cardRepository().save({ ...card, description: newDescription });

  return updatedCard;
};

const updatePositionService = async (data: BodyForUpdatingPos): Promise<Card[]> => {
  const { columnId, newPosition, cardId } = data;
  const cards: Card[] = await cardRepository().find({
    where: { column: { id: columnId } },
    order: { position: 'ASC' }
  });

  const { requiredEntity, currentPosition: currentCardPosition } = findEntity<Card>(cards, cardId);

  if (!requiredEntity || currentCardPosition === undefined) {
    throw new BadRequest();
  }

  const repositionedCards: Card[] = repositionEntity<Card>(
    cards,
    requiredEntity,
    newPosition,
    currentCardPosition
  );

  const updatedCards = cardRepository().save(repositionedCards);

  return updatedCards;
};

const transferCardService = async (data: BodyForTransferringCard): Promise<void> => {
  const { columnId, newColumnId, cardId, newPosition = 0 } = data;
  const newColumn: Column | undefined = await columnRepository().findOne(newColumnId);

  if (!newColumn) {
    throw new NotFound('Column does not exist');
  }

  await cardRepository().update(cardId, { position: newPosition, column: newColumn });

  const cardListOfPreviousColumn: Card[] = await cardRepository().find({
    where: { column: { id: columnId } },
    order: { position: 'ASC' }
  });

  const cardListOfCurrentColumn: Card[] = await cardRepository().find({
    where: { column: { id: newColumnId } },
    order: { position: 'ASC' }
  });

  const { requiredEntity, currentPosition: currentCardPosition } = findEntity<Card>(
    cardListOfCurrentColumn,
    cardId
  );

  if (!requiredEntity || currentCardPosition === undefined) {
    throw new BadRequest();
  }

  const updatedCardListOfPreviousColumn: Card[] = cardListOfPreviousColumn.map((el, idx) => ({
    ...el,
    position: idx
  }));

  const updatedCardListOfCurrentColumn: Card[] = repositionEntity<Card>(
    cardListOfCurrentColumn,
    requiredEntity,
    newPosition,
    currentCardPosition
  );

  await cardRepository().save([
    ...updatedCardListOfPreviousColumn,
    ...updatedCardListOfCurrentColumn
  ]);
};

const deleteService = async (data: ParamsForDeleting): Promise<void> => {
  const { cardId, columnId } = data;
  await cardRepository().delete(cardId);

  const cards: Card[] = await cardRepository().find({
    where: { column: { id: columnId } },
    order: { position: 'ASC' }
  });

  const repositionedCards: Card[] = cards.map((el, idx) => ({
    ...el,
    position: idx
  }));

  await cardRepository().save(repositionedCards);
};

export {
  getCardsService,
  createCardService,
  updateNameService,
  updateDescriptionService,
  updatePositionService,
  transferCardService,
  deleteService
};
