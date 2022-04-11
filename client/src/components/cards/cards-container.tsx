import React, {
  useEffect,
  useState,
  useReducer,
  useCallback,
  Dispatch,
  SetStateAction
} from 'react';
import { useDispatch } from 'react-redux';

import Card from './components/card';
import { useAppSelector } from '../../store/hooks';
import { getCards, changeCardStatus, changeCardPosition } from '../../store/actions/card';
import { Card as CardType } from '../../store/card/types';
import { CardsContainer as Container, DragWrapper } from './sc';

interface Props {
  columnId: string;
  draggableCard: null | CardType;
  setDraggableCard: Dispatch<SetStateAction<CardType | null>>;
}

interface CardStyles {
  cardId: string;
  backgroundColor: string;
}

interface ActionStylesReducer {
  type: string;
  payload: string;
}

const CardsContainer: React.FC<Props> = ({ columnId, draggableCard, setDraggableCard }) => {
  const dispatch = useDispatch();
  const cardsData = useAppSelector((state) => state.cardsData[columnId]);
  const [isPointCards, setPointCards] = useState(false);

  const stylesReducer = useCallback((state: CardStyles, action: ActionStylesReducer) => {
    switch (action.type) {
      case 'SET_BACKGROUND':
        return {
          cardId: action.payload,
          backgroundColor: 'rgba(0,0,0,0.03)'
        };
      case 'RESET_BACKGROUND':
        return {
          cardId: action.payload,
          backgroundColor: 'none'
        };
      default:
        return state;
    }
  }, []);

  const [styles, dispatchStyles] = useReducer(stylesReducer, {
    cardId: '',
    backgroundColor: 'none'
  });

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: CardType) => {
    e.stopPropagation();
    setDraggableCard(card);
    setPointCards(true);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>, card: CardType) => {
    e.preventDefault();
    if (card.id !== styles.cardId || styles.backgroundColor === 'none') {
      dispatchStyles({ type: 'SET_BACKGROUND', payload: card.id });
    }
  };

  const dragEnterHandler = useCallback(() => setPointCards(true), []);

  const dragLeaveHandler = (card: CardType) => {
    dispatchStyles({ type: 'RESET_BACKGROUND', payload: card.id });
  };

  const dragEndHandler = (card: CardType) => {
    setPointCards(false);
    setDraggableCard(null);
    dispatchStyles({ type: 'RESET_BACKGROUND', payload: card.id });
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, card: CardType) => {
    e.preventDefault();
    setDraggableCard(null);
    setPointCards(false);
    dispatchStyles({ type: 'RESET_BACKGROUND', payload: card.id });
    if (draggableCard && draggableCard.columnId !== card.columnId) {
      dispatch(
        changeCardStatus({
          cardId: draggableCard.id,
          columnId: draggableCard.columnId,
          newColumnId: card.columnId,
          newPosition: card.position
        })
      );
      return;
    }
    if (draggableCard && draggableCard.position !== card.position) {
      dispatch(
        changeCardPosition({
          columnId: draggableCard.columnId,
          cardId: draggableCard.id,
          newPosition: card.position
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getCards(columnId));
  }, []);

  return (
    <Container>
      {cardsData?.map((el) => (
        <DragWrapper
          key={el.id}
          isPointCards={isPointCards}
          draggable
          onDragStart={(e) => dragStartHandler(e, el)}
          onDragEnd={() => dragEndHandler(el)}
          onDragLeave={() => dragLeaveHandler(el)}
          onDragEnter={dragEnterHandler}
          onDragOver={(e) => dragOverHandler(e, el)}
          onDrop={(e) => dropHandler(e, el)}
        >
          <Card
            cardId={el.id}
            description={el.description}
            name={el.name}
            columnId={columnId}
            dragStyles={styles}
          />
        </DragWrapper>
      ))}
    </Container>
  );
};
export default CardsContainer;
