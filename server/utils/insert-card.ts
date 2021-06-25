import { CardsInDB } from '../app/models/card';

const insertCardToArr = (
  arr: CardsInDB[],
  editableEl: CardsInDB,
  newPosition: number,
  indexOldEl: number
): CardsInDB[] => {
  if (editableEl.position < newPosition) {
    arr.splice(+newPosition + 1, 0, editableEl);
    arr.splice(indexOldEl, 1);
    return arr;
  }

  arr.splice(+newPosition, 0, editableEl);
  arr.splice(indexOldEl + 1, 1);
  return arr;
};

export default insertCardToArr;
