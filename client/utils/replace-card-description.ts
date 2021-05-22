import { Card } from '../src/store/card/actions';
import { CardData } from '../src/store/card/reducer';

function replaceCardDescription(state: CardData, payload: Card): Card[] {
  return state.cards[payload.columnId]((el) =>
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
}

export default replaceCardDescription;
