import {
  PUT_BOARD_COLUMNS,
  PUT_CREATED_COLUMN,
  PUT_COLUMN_WITH_NEW_POSITION,
  PUT_RENAMED_COLUMN,
  DELETE_COLUMNS_DATA,
  Column
} from './actions';
import replaceColumnName from '../../../utils/replace-column-name';

export interface ColumnData {
  columns: Column[];
}

const boardColumnsIS: ColumnData = {
  columns: []
};

const boardColumns = (
  state = boardColumnsIS,
  { type, payload }: { type: string; payload: Column[] | Column }
): ColumnData => {
  switch (type) {
    case PUT_BOARD_COLUMNS:
      if (Array.isArray(payload)) {
        return {
          ...state,
          columns: payload as Column[]
        };
      }
      return { ...state };
    case PUT_CREATED_COLUMN:
      if (payload.hasOwnProperty('id')) {
        return {
          ...state,
          columns: [...state.columns, ...[payload as Column]]
        };
      }
      return { ...state };
    case PUT_RENAMED_COLUMN:
      return {
        ...state,
        columns: replaceColumnName(state, payload as Column)
      };
    case PUT_COLUMN_WITH_NEW_POSITION:
      if (Array.isArray(payload)) {
        return {
          ...state,
          columns: payload as Column[]
        };
      }
      return { ...state };
    case DELETE_COLUMNS_DATA:
      return { ...state, ...boardColumnsIS };
    default:
      return state;
  }
};

export default boardColumns;
