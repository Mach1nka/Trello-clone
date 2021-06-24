import { ColumnsInDB } from '../app/models/column';

const insertColumnToArr = (
  arr: ColumnsInDB[],
  editableEl: ColumnsInDB,
  newPosition: number,
  indexOldEl: number
): ColumnsInDB[] => {
  if (editableEl.position < newPosition) {
    arr.splice(+newPosition + 1, 0, editableEl);
    arr.splice(indexOldEl, 1);
    return arr;
  }

  arr.splice(+newPosition, 0, editableEl);
  arr.splice(indexOldEl + 1, 1);
  return arr;
};

export default insertColumnToArr;
