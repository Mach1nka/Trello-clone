import {
  PUT_BOARD_COLUMNS,
  PUT_CREATED_COLUMN,
  PUT_COLUMN_WITH_NEW_POSITION,
  PUT_RENAMED_COLUMN,
  DELETE_ALL_COLUMNS,
  ColumnData,
  Column
} from './actions';
import replaceColumnName from '../../../utils/replace-column-name';

const boardColumnsIS: ColumnData = {
  id: '',
  columns: []
};

const boardColumns = (
  state = boardColumnsIS,
  { type, payload }: { type: string; payload: ColumnData | Column }
): ColumnData => {
  switch (type) {
    case PUT_BOARD_COLUMNS:
      return { ...state, ...payload };
    case PUT_CREATED_COLUMN:
      if (payload.hasOwnProperty('columns')) {
        return {
          ...state,
          ...(payload as ColumnData)
        };
      }
      return {
        ...state,
        columns: [...state.columns, ...[payload as Column]]
      };
    case PUT_RENAMED_COLUMN:
      return {
        ...state,
        columns: replaceColumnName(state, payload as Column)
      };
    case PUT_COLUMN_WITH_NEW_POSITION:
      return { ...state, ...(payload as ColumnData) };
    case DELETE_ALL_COLUMNS:
      return { ...state, ...boardColumnsIS };
    default:
      return state;
  }
};

export default boardColumns;
