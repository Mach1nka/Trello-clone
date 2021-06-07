import React, { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { CardsContainer as Container, DragWrapper } from './sc';
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
  const [isPointCard, setPointCard] = useState(false);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, card: CardType) => {
    setDraggableCard(card);
    setPointCard(true);
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.firstChild.style.background = 'rgba(0, 0, 0, 0.03)';
  };

  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    setPointCard(true);
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.firstChild.style.background = '#fff';
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    setPointCard(false);
    e.currentTarget.firstChild.style.background = '#fff';
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, card: CardType) => {
    e.preventDefault();
    setPointCard(false);
    e.currentTarget.firstChild.style.background = '#fff';
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
        <DragWrapper
          key={el.id}
          isPointCard={isPointCard}
          draggable
          onDragStart={(e) => dragStartHandler(e, el)}
          onDragEnd={(e) => dragEndHandler(e)}
          onDragLeave={(e) => dragLeaveHandler(e)}
          onDragEnter={(e) => dragEnterHandler(e)}
          onDragOver={(e) => dragOverHandler(e)}
          onDrop={(e) => dropHandler(e, el)}
        >
          <Card
            cardId={el.id}
            description={el.description}
            name={el.name}
            position={el.position}
            columnId={columnId}
          />
        </DragWrapper>
      ))}
    </Container>
  );
};
export default CardsContainer;
