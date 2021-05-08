import {
  PUT_BOARD_COLUMNS,
  PUT_CREATED_COLUMN,
  PUT_COLUMN_WITH_NEW_POSITION,
  PUT_RENAMED_COLUMN,
  ColumnList,
  Column,
  UpdatedColumn
} from './actions';
import replaceColumnName from '../../../utils/replace-column-name';
import sortColumnPos from '../../../utils/sort-columns-position';

const boardColumnsIS: ColumnList = {
  columns: []
};

const boardColumns = (
  state = boardColumnsIS,
  { type, payload }: { type: string; payload: Column | ColumnList | UpdatedColumn }
): ColumnList => {
  switch (type) {
    case PUT_BOARD_COLUMNS:
      return {
        ...state,
        columns: sortColumnPos(payload as ColumnList)
      };
    case PUT_CREATED_COLUMN:
      return {
        ...state,
        columns: state.columns.concat(payload as Column)
      };
    case PUT_RENAMED_COLUMN:
      return {
        ...state,
        columns: replaceColumnName(state, payload as UpdatedColumn)
      };
    case PUT_COLUMN_WITH_NEW_POSITION:
      return state;
    default:
      return state;
  }
};

export default boardColumns;
