export enum ModalTypes {
  SET_CARD_DATA = 'SET_CARD_DATA',
  SET_BOARD_ID = 'SET_BOARD_ID',
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

export interface CardDataForModal {
  cardId: string;
  columnId: string;
  name: string;
  description: string;
}

export interface BoardDataForModal {
  boardId: string;
}

export interface ModalsData {
  dataForModals: CardDataForModal & BoardDataForModal;
  modalsStates: ModalsStates;
}

export type ModalActions =
  | { type: ModalTypes.SET_CARD_DATA; payload: CardDataForModal }
  | { type: ModalTypes.SET_BOARD_ID; payload: BoardDataForModal }
  | { type: ModalTypes.SET_MODAL_STATE; payload: Partial<ModalsStates> }
  | { type: ModalTypes.RESET_MODAL_DATA };
