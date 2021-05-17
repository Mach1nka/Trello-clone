import { Column, ColumnData } from '../src/store/column/actions';

function replaceColumnName(state: ColumnData, payload: Column): Column[] {
  return state.columns.map((el) =>
    el._id === payload._id ? { _id: payload._id, name: payload.name, position: el.position } : el
  );
}

export default replaceColumnName;
