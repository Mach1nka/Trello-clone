import { ModalTypes, ModalsStates, CardDataForModal, BoardDataForModal } from './types';

const setCardDataForModal = (
  cardData: CardDataForModal
): {
  type: string;
  payload: CardDataForModal;
} => ({
  type: ModalTypes.SET_CARD_DATA,
  payload: cardData
});

const setBoardIdForModal = (
  cardData: BoardDataForModal
): {
  type: string;
  payload: BoardDataForModal;
} => ({
  type: ModalTypes.SET_CARD_DATA,
  payload: cardData
});

const setModalsStates = (
  modalsStates: Partial<ModalsStates>
): {
  type: string;
  payload: Partial<ModalsStates>;
} => ({
  type: ModalTypes.SET_MODAL_STATE,
  payload: modalsStates
});

const resetModalData = (): { type: string } => ({ type: ModalTypes.RESET_MODAL_DATA });

export { setCardDataForModal, setBoardIdForModal, setModalsStates, resetModalData };
