export enum ModalTypes {
  SET_CARD_DATA = 'SET_CARD_DATA',
  SET_MODAL_STATE = 'SET_MODAL_STATE',
  RESET_MODAL_DATA = 'RESET_MODAL_DATA'
}

export interface ModalsStates {
  isRenameModalVisible: boolean;
  isDetailsModalVisible: boolean;
  isStatusModalVisible: boolean;
  isPositionModalVisible: boolean;
  isShareModalVisible: boolean;
}

export interface CardData {
  cardId: string;
  columnId: string;
  name: string;
  description: string;
  boardId?: string;
}

export interface ModalsData {
  dataForModals: CardData;
  modalsStates: ModalsStates;
}

export type ModalActions =
  | { type: ModalTypes.SET_CARD_DATA; payload: CardData }
  | { type: ModalTypes.SET_MODAL_STATE; payload: ModalsStates }
  | { type: ModalTypes.RESET_MODAL_DATA };
