const SET_CARD_DATA = 'SET_MODAL_DATA';
const SET_MODAL_STATE = 'SET_MODAL_STATE';
const RESET_MODAL_DATA = 'RESET_MODAL_DATA';

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
  name?: string;
  description?: string;
  boardId: string;
}

export interface ModalsData {
  dataForModals: CardData;
  modalsStates: ModalsStates;
}

const setModalData = (
  cardData: CardData
): {
  type: string;
  payload: CardData;
} => ({
  type: SET_CARD_DATA,
  payload: cardData
});

const setModalsStates = (
  modalsStates: ModalsStates
): {
  type: string;
  payload: ModalsStates;
} => ({
  type: SET_MODAL_STATE,
  payload: modalsStates
});

const resetModalData = (): { type: string } => ({ type: RESET_MODAL_DATA });

export {
  SET_CARD_DATA,
  SET_MODAL_STATE,
  RESET_MODAL_DATA,
  setModalData,
  setModalsStates,
  resetModalData
};
