import { BoardColumn as Column } from '../app/entities/column';

const repositionColumn = (
  columns: Column[],
  editableEl: Column,
  newPosition: number,
  indexOldEl: number
): Column[] => {
  if (editableEl.position < newPosition) {
    columns.splice(+newPosition + 1, 0, editableEl);
    columns.splice(indexOldEl, 1);
    return columns;
  }

  columns.splice(+newPosition, 0, editableEl);
  columns.splice(indexOldEl + 1, 1);

  return columns.map((el, idx) => ({
    ...el,
    position: idx
  }));
};

export default repositionColumn;
