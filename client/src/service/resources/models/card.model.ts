export interface Card {
  id: string;
  name: string;
  description: string;
  columnId: string;
  position: number;
}

export interface CardListServerResponse {
  columnId: string;
  cards: Card[];
}

export interface CardState {
  [x: string]: Card[];
}

export interface DataForCreatingCard {
  columnId: string;
  description: string;
  name: string;
}

export interface DataForRenamingCard {
  cardId: string;
  newName: string;
}

export interface DataForUpdatingCardDesc {
  cardId: string;
  newDescription?: string;
}

export interface DataForUpdatingCardPos {
  columnId: string;
  cardId: string;
  newPosition: number;
}

export interface DataForTransferring {
  columnId: string;
  cardId: string;
  newColumnId: string;
  newPosition?: number;
}

export interface DataForDeletingCard {
  columnId: string;
  cardId: string;
}

export enum CardThunkAction {
  GetCards = 'getCards',
  CreateCard = 'createCard',
  RenameColumn = 'renameColumn',
  UpdateCardDescription = 'updateCardDescription',
  UpdateCardPosition = 'updateCardPosition',
  TransferCard = 'transferCard',
  DeleteCard = 'deleteCard'
}
