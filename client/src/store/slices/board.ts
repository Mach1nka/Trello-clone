import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  BoardState,
  Board,
  BoardListServerResponse
} from '../../service/resources/models/board.model';
import updateReduxEntity from '../../../utils/updateEntity';

const initialState: BoardState = {
  ownBoards: [],
  sharedBoards: []
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    getBoards: (state, { payload }: PayloadAction<BoardListServerResponse>) => {
      state = payload;
    },
    createBoard: (state, { payload }: PayloadAction<Board>) => {
      state.ownBoards.push(payload);
    },
    renameBoard: (state, { payload }: PayloadAction<Board>) => {
      state.ownBoards = updateReduxEntity<Board>(state.ownBoards, payload);
    },
    clearBoards: () => initialState
  }
});

export const { getBoards, renameBoard, createBoard, clearBoards } = boardSlice.actions;
export default boardSlice.reducer;
