import { ColumnList, Column } from '../src/store/column/actions';

function sortColumnPos(payload: ColumnList): Column[] {
  return payload.columns.sort((a, b) => a.position - b.position);
}

export default sortColumnPos;
