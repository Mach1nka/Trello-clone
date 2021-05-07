import { Column, UpdatedColumn, ColumnList } from '../src/store/column/actions';

function replaceColumnName(state: ColumnList, payload: UpdatedColumn): Column[] {
  return state.columns.map((el) =>
    el.id === payload.id
      ? { id: payload.id, name: payload.name, board: el.board, position: el.position }
      : el
  );
}

export default replaceColumnName;
