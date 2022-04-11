import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import updateReduxEntity from '../../../utils/updateEntity';
import { Card, CardListServerResponse, CardState } from '../../service/resources/models/card.model';

const initialState: CardState = {};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    getCards: (state, { payload }: PayloadAction<CardListServerResponse>) => {
      state[payload.columnId] = payload.cards;
    },
    createCard: (state, { payload }: PayloadAction<Card>) => {
      state[payload.columnId].push(payload);
    },
    updateCard: (state, { payload }: PayloadAction<Card>) => {
      state[payload.columnId] = updateReduxEntity<Card>(state[payload.columnId], payload);
    },
    updateCardPosition: (state, { payload }: PayloadAction<CardListServerResponse>) => {
      state[payload.columnId] = payload.cards;
    },
    clearCards: () => initialState
  }
});

export const { getCards, createCard, updateCard, clearCards } = cardSlice.actions;
export default cardSlice.reducer;
