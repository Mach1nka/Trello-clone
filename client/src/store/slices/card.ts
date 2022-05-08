import { PayloadAction } from '@reduxjs/toolkit';

import generateActionTypeHelper from '../../utils/action-type-helper';
import getSliceHelper from '../../utils/slice-helper';
import updateReduxEntity from '../../utils/update-entity';
import {
  Card,
  CardListServerResponse,
  CardState,
  CardThunkAction
} from '../../service/resources/models/card.model';
import { SliceHelperProps, SliceName } from '../../service/resources/models/common.model';

const createActionType = generateActionTypeHelper(SliceName.Column);

const cardSliceSetup: Omit<SliceHelperProps<CardState>, 'reducers'> = {
  name: SliceName.Card,
  initialState: { columns: [] },
  extraReducers: {
    [createActionType(CardThunkAction.GetCards)]: (
      state,
      { payload }: PayloadAction<CardListServerResponse>
    ) => {
      state[payload.columnId] = payload.cards;
    },
    [createActionType(CardThunkAction.CreateCard)]: (state, { payload }: PayloadAction<Card>) => {
      state[payload.columnId].push(payload);
    },
    [createActionType(CardThunkAction.UpdateCard)]: (state, { payload }: PayloadAction<Card>) => {
      state[payload.columnId] = updateReduxEntity<Card>(state[payload.columnId], payload);
    },
    [createActionType(CardThunkAction.UpdateCardPosition)]: (
      state,
      { payload }: PayloadAction<CardListServerResponse>
    ) => {
      state[payload.columnId] = payload.cards;
    }
  }
};

const cardSlice = getSliceHelper(cardSliceSetup);

export const { cleaning } = cardSlice.actions;
export default cardSlice.reducer;
