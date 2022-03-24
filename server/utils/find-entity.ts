export interface Entity {
  id: string;
  position: number;
}

interface Result<S> {
  requiredEntity: S | undefined;
  currentPosition: number | undefined;
}

const findEntity = <T extends Entity>(entities: T[], id: string): Result<T> => {
  let currentPosition: number | undefined;

  const requiredEntity = entities.find((el: T) => {
    if (el.id === id) {
      currentPosition = el.position;
      return el;
    }
    return null;
  });

  return { requiredEntity, currentPosition };
};

export default findEntity;
