import {
  SET_CARD_DATA,
  SET_MODAL_STATE,
  RESET_MODAL_DATA,
  ModalsData,
  ModalsStates,
  CardData
} from './actions';

const modalsDataIS: ModalsData = {
  cardData: {
    cardId: '',
    columnId: '',
    name: '',
    description: ''
  },
  modalsStates: {
    isRenameModalVisible: false,
    isDetailsModalVisible: false,
    isStatusModalVisible: false,
    isPositionModalVisible: false
  }
};

const modalsData = (
  state = modalsDataIS,
  { type, payload }: { type: string; payload: ModalsStates | CardData }
): ModalsData => {
  switch (type) {
    case SET_CARD_DATA:
      return {
        ...state,
        cardData: payload as CardData
      };
    case SET_MODAL_STATE:
      return {
        ...state,
        modalsStates: { ...state.modalsStates, ...(payload as ModalsStates) }
      };
    case RESET_MODAL_DATA:
      return { ...state, ...modalsDataIS };
    default:
      return state;
  }
};

export default modalsData;
