import {
  SET_CARD_DATA,
  SET_MODAL_STATE,
  RESET_MODAL_DATA,
  ModalsData,
  ModalsStates,
  CardData
} from './actions';

const initialModalsState: ModalsData = {
  dataForModals: {
    cardId: '',
    columnId: '',
    name: '',
    description: '',
    boardId: ''
  },
  modalsStates: {
    isRenameModalVisible: false,
    isDetailsModalVisible: false,
    isStatusModalVisible: false,
    isPositionModalVisible: false,
    isShareModalVisible: false
  }
};

const modalsData = (
  state = initialModalsState,
  { type, payload }: { type: string; payload: ModalsStates | CardData }
): ModalsData => {
  switch (type) {
    case SET_CARD_DATA:
      return {
        ...state,
        dataForModals: { ...state.dataForModals, ...(payload as CardData) }
      };
    case SET_MODAL_STATE:
      return {
        ...state,
        modalsStates: { ...state.modalsStates, ...(payload as ModalsStates) }
      };
    case RESET_MODAL_DATA:
      return { ...state, ...initialModalsState };
    default:
      return state;
  }
};

export default modalsData;
