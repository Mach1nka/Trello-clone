import { ModalTypes, ModalsData, ModalActions } from './types';

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

const modalsData = (state = initialModalsState, action: ModalActions): ModalsData => {
  switch (action.type) {
    case ModalTypes.SET_CARD_DATA:
      return {
        ...state,
        dataForModals: { ...state.dataForModals, ...action.payload }
      };
    case ModalTypes.SET_MODAL_STATE:
      return {
        ...state,
        modalsStates: { ...state.modalsStates, ...action.payload }
      };
    case ModalTypes.SET_BOARD_ID:
      return {
        ...state,
        modalsStates: { ...state.modalsStates, ...action.payload }
      };
    case ModalTypes.RESET_MODAL_DATA:
      return { ...state, ...initialModalsState };
    default:
      return state;
  }
};

export default modalsData;
