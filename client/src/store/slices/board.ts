import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  BoardState,
  Board,
  BoardListServerResponse
} from '../../service/resources/models/board.model';
import updateReduxEntity from '../../../utils/updateEntity';
import { SliceName } from '../../service/resources/models/common.model';

const initialState: BoardState = {
  ownBoards: [],
  sharedBoards: []
};

const boardSlice = createSlice({
  name: SliceName.Board,
  initialState,
  reducers: {
    getBoards: (state, { payload }: PayloadAction<BoardListServerResponse>) => {
      state = payload;
    },
    createBoard: (state, { payload }: PayloadAction<Board>) => {
      state.ownBoards.push(payload);
    },
    updateBoard: (state, { payload }: PayloadAction<Board>) => {
      state.ownBoards = updateReduxEntity<Board>(state.ownBoards, payload);
    },
    clearBoards: () => initialState
  }
});

export const { getBoards, updateBoard, createBoard, clearBoards } = boardSlice.actions;
export default boardSlice.reducer;
