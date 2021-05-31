import React, { useEffect, Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { CardsContainer as Container } from './sc';
import {
  getCards,
  changeCardStatus,
  changeCardPosition,
  Card as CardType
} from '../../store/card/actions';
import Card from './card';

interface Props {
  columnId: string;
  draggableCard: null | CardType;
  setDraggableCard: Dispatch<SetStateAction<CardType | null>>;
}

const CardsContainer: React.FC<Props> = ({ columnId, draggableCard, setDraggableCard }) => {
  const dispatch = useDispatch();
  const cardsData = useAppSelector((state) => state.cardData.cards[columnId]);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: CardType) => {
    setDraggableCard(card);
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, card: CardType) => {
    e.preventDefault();
    if (draggableCard && draggableCard.columnId !== card.columnId) {
      dispatch(
        changeCardStatus({
          cardId: draggableCard.id,
          columnId: draggableCard.columnId,
          newColumnId: card.columnId,
          newPosition: card.position
        })
      );
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
        <div
          key={el.id}
          draggable
          onDragStart={(e) => dragStartHandler(e, el)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => dropHandler(e, el)}
        >
          <Card
            cardId={el.id}
            description={el.description}
            name={el.name}
            position={el.position}
            columnId={columnId}
          />
        </div>
      ))}
    </Container>
  );
};
export default CardsContainer;
