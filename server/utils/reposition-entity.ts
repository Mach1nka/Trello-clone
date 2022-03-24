import { Entity } from './find-entity';

const repositionEntity = <T extends Entity>(
  entities: T[],
  editableEntity: T,
  newPosition: number,
  currentPosition: number
): T[] => {
  if (editableEntity.position < newPosition) {
    entities.splice(+newPosition + 1, 0, editableEntity);
    entities.splice(currentPosition, 1);
  } else {
    entities.splice(+newPosition, 0, editableEntity);
    entities.splice(currentPosition + 1, 1);
  }

  return entities.map((el: T, idx) => ({
    ...el,
    position: idx
  }));
};

export default repositionEntity;
