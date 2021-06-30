import { ColumnTypes, Column, BoardActions } from './types';
import replaceColumnName from '../../../utils/replace-column-name';

export interface ColumnData {
  columns: Column[];
}

const initialColumnsState: ColumnData = {
  columns: []
};

const boardColumns = (state = initialColumnsState, action: BoardActions): ColumnData => {
  switch (action.type) {
    case ColumnTypes.PUT_COLUMNS:
      return {
        ...state,
        columns: action.payload
      };
    case ColumnTypes.PUT_CREATED_COLUMN:
      return {
        ...state,
        columns: [...state.columns, ...[action.payload]]
      };
    case ColumnTypes.PUT_RENAMED_COLUMN:
      return {
        ...state,
        columns: replaceColumnName(state, action.payload)
      };
    case ColumnTypes.PUT_COLUMN_WITH_NEW_POSITION:
      return {
        ...state,
        columns: action.payload
      };
    case ColumnTypes.DELETE_COLUMNS_DATA:
      return { ...state, ...initialColumnsState };
    default:
      return state;
  }
};

export default boardColumns;
