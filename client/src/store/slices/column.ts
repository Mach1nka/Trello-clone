import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import updateReduxEntity from '../../../utils/updateEntity';
import {
  ColumnState,
  Column,
  ColumnListServerResponse
} from '../../service/resources/models/column.model';
import { SliceName } from '../../service/resources/models/common.model';

const initialState: ColumnState = {
  columns: []
};

const columnSlice = createSlice({
  name: SliceName.Column,
  initialState,
  reducers: {
    getColumns: (state, { payload }: PayloadAction<ColumnListServerResponse>) => {
      state.columns = payload.columns;
    },
    createColumn: (state, { payload }: PayloadAction<Column>) => {
      state.columns.push(payload);
    },
    updateColumn: (state, { payload }: PayloadAction<Column>) => {
      state.columns = updateReduxEntity<Column>(state.columns, payload);
    },
    updateColumnPosition: (state, { payload }: PayloadAction<ColumnListServerResponse>) => {
      state.columns = payload.columns;
    },
    clearColumns: () => initialState
  }
});

export const { getColumns, createColumn, updateColumn, updateColumnPosition, clearColumns } =
  columnSlice.actions;
export default columnSlice.reducer;
