import { ModalTypes, ModalsStates, CardData } from './types';

const setModalData = (
  cardData: CardData
): {
  type: string;
  payload: CardData;
} => ({
  type: ModalTypes.SET_CARD_DATA,
  payload: cardData
});

const setModalsStates = (
  modalsStates: ModalsStates
): {
  type: string;
  payload: ModalsStates;
} => ({
  type: ModalTypes.SET_MODAL_STATE,
  payload: modalsStates
});

const resetModalData = (): { type: string } => ({ type: ModalTypes.RESET_MODAL_DATA });

export { setModalData, setModalsStates, resetModalData };
