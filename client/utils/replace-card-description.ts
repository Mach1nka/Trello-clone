import { Card } from '../src/store/card/types';
import { CardData } from '../src/store/card/reducer';

const replaceCardDescription = (state: CardData, payload: Card): Card[] =>
  state[payload.columnId].map((el: Card) =>
    el.id === payload.id
      ? {
          id: payload.id,
          description: payload.description,
          columnId: payload.columnId,
          name: payload.name,
          position: el.position
        }
      : el
  );

export default replaceCardDescription;
