import { Card } from '../src/store/card/actions';
import { CardData } from '../src/store/card/reducer';

const replaceCardDescription = (state: CardData, payload: Card): Card[] =>
  state.cards[payload.columnId].map((el: Card) =>
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
