import { Column } from '../src/store/column/actions';
import { ColumnData } from '../src/store/column/reducer';

function replaceColumnName(state: ColumnData, payload: Column): Column[] {
  return state.columns.map((el) =>
    el.id === payload.id
      ? { id: payload.id, boardId: payload.boardId, name: payload.name, position: el.position }
      : el
  );
}

export default replaceColumnName;
