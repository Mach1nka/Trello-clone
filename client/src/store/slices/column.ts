import { PayloadAction } from '@reduxjs/toolkit';

import generateActionTypeHelper from '../../../utils/action-type-helper';
import getSliceHelper from '../../../utils/slice-helper';
import updateReduxEntity from '../../../utils/update-entity';
import {
  ColumnState,
  Column,
  ColumnListServerResponse,
  ColumnThunkAction
} from '../../service/resources/models/column.model';
import { SliceHelperProps, SliceName } from '../../service/resources/models/common.model';

const createActionType = generateActionTypeHelper(SliceName.Column);

const columnSliceSetup: Omit<SliceHelperProps<ColumnState>, 'reducers'> = {
  name: SliceName.Column,
  initialState: { columns: [] },
  extraReducers: {
    [createActionType(ColumnThunkAction.GetColumns)]: (
      state,
      { payload }: PayloadAction<ColumnListServerResponse>
    ) => {
      state.columns = payload.columns;
    },
    [createActionType(ColumnThunkAction.CreateColumn)]: (
      state,
      { payload }: PayloadAction<Column>
    ) => {
      state.columns.push(payload);
    },
    [createActionType(ColumnThunkAction.UpdateColumn)]: (
      state,
      { payload }: PayloadAction<Column>
    ) => {
      state.columns = updateReduxEntity<Column>(state.columns, payload);
    },
    [createActionType(ColumnThunkAction.UpdateColumnPosition)]: (
      state,
      { payload }: PayloadAction<ColumnListServerResponse>
    ) => {
      state.columns = payload.columns;
    }
  }
};

const columnSlice = getSliceHelper(columnSliceSetup);

export const { cleaning } = columnSlice.actions;
export default columnSlice.reducer;
