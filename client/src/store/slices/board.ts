import { PayloadAction } from '@reduxjs/toolkit';

import generateActionTypeHelper from '../../../utils/action-type-helper';
import getSliceHelper from '../../../utils/slice-helper';
import updateReduxEntity from '../../../utils/update-entity';
import {
  Board,
  BoardListServerResponse,
  BoardState,
  BoardThunkAction
} from '../../service/resources/models/board.model';
import { SliceName, SliceHelperProps } from '../../service/resources/models/common.model';

const createActionType = generateActionTypeHelper(SliceName.Board);

const boardSliceSetup: Omit<SliceHelperProps<BoardState>, 'reducers'> = {
  name: SliceName.Board,
  initialState: {
    ownBoards: [],
    sharedBoards: []
  },
  extraReducers: {
    [createActionType(BoardThunkAction.GetBoards)]: (
      state,
      { payload }: PayloadAction<BoardListServerResponse>
    ) => {
      state = payload;
    },
    [createActionType(BoardThunkAction.CreateBoard)]: (
      state,
      { payload }: PayloadAction<Board>
    ) => {
      state.ownBoards.push(payload);
    },
    [createActionType(BoardThunkAction.UpdateBoard)]: (
      state,
      { payload }: PayloadAction<Board>
    ) => {
      state.ownBoards = updateReduxEntity<Board>(state.ownBoards, payload);
    }
  }
};

const boardSlice = getSliceHelper(boardSliceSetup);

export const { cleaning } = boardSlice.actions;
export default boardSlice.reducer;
