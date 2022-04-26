import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const selectAuthState = (state: RootState) => state.authState;
const selectBoardsState = (state: RootState) => state.boardsState;
const selectColumnsState = (state: RootState) => state.columnsState;
const selectCardsState = (state: RootState) => state.cardsState;
const selectMaintainState = (state: RootState) => state.maintainState;

const selectAuthData = createSelector(selectAuthState, (authState) => authState);

const selectBoardsData = createSelector(selectBoardsState, (boardsState) => boardsState);

const selectBoardById = createSelector(
  [selectBoardsState, (_state, id: string) => id],
  (boardsState, id) => boardsState.ownBoards.find((el) => el.id === id)
);

const selectColumnsData = createSelector(
  selectColumnsState,
  (columnsState) => columnsState.columns
);

const selectColumnsPositions = createSelector(selectColumnsState, (columnsState) =>
  columnsState.columns.map((el) => el.position)
);

const selectColumnById = createSelector(
  [selectColumnsState, (_state, id: string) => id],
  (columnsState, id) => columnsState.columns.find((el) => el.id === id)
);

const selectCardsData = createSelector(
  [selectCardsState, (_state, columnId: string) => columnId],
  (cardsState, columnId) => cardsState[columnId]
);

const selectCardById = createSelector(
  [selectCardsState, (_state, columnId: string) => columnId, (_state, cardId: string) => cardId],
  (cardsState, columnId, cardId) => cardsState[columnId].find((el) => el.id === cardId)
);

const selectCardsPositions = createSelector(
  [selectColumnsState, (_state, columnId: string) => columnId],
  (cardsState, columnId) => cardsState[columnId].map((el) => el.position)
);

const selectMaintainData = createSelector(selectMaintainState, (maintainState) => maintainState);

export {
  selectAuthData,
  selectBoardsData,
  selectBoardById,
  selectColumnsData,
  selectColumnById,
  selectColumnsPositions,
  selectCardsData,
  selectCardsPositions,
  selectCardById,
  selectMaintainData
};
