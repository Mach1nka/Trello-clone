import { Card } from '../../app/entities/card';

export interface ParamsForGetting {
  columnId: string;
}

export type CardResponse = Pick<Card, 'id' | 'name' | 'position' | 'description'> & {
  columnId: string;
};

export interface CardListResponse {
  columnId: string;
  cards: CardResponse[];
}

export interface BodyForCreating {
  name: string;
  columnId: string;
  description: string | undefined;
}

export interface BodyForRenaming {
  cardId: string;
  newName: string;
}

export interface BodyForUpdatingDesc {
  cardId: string;
  newDescription: string;
}

export interface BodyForUpdatingPos {
  cardId: string;
  columnId: string;
  newPosition: number;
}

export interface BodyForTransferringCard {
  columnId: string;
  newColumnId: string;
  cardId: string;
  newPosition: number;
}

export interface BodyForDeleting {
  cardId: string;
  columnId: string;
}
