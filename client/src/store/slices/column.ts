import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import updateReduxEntity from '../../../utils/updateEntity';
import {
  ColumnState,
  Column,
  ColumnListServerResponse
} from '../../service/resources/models/column.model';

const initialState: ColumnState = {
  columns: []
};

const columnSlice = createSlice({
  name: 'column',
  initialState,
  reducers: {
    getColumns: (state, { payload }: PayloadAction<ColumnListServerResponse>) => {
      state.columns = payload.columns;
    },
    createColumn: (state, { payload }: PayloadAction<Column>) => {
      state.columns.push(payload);
    },
    renameColumn: (state, { payload }: PayloadAction<Column>) => {
      state.columns = updateReduxEntity<Column>(state.columns, payload);
    },
    updateColumnPosition: (state, { payload }: PayloadAction<ColumnListServerResponse>) => {
      state.columns = payload.columns;
    },
    clearColumns: () => initialState
  }
});

export const { getColumns, createColumn, renameColumn, updateColumnPosition, clearColumns } =
  columnSlice.actions;
export default columnSlice.reducer;
