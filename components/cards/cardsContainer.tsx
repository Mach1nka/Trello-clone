import {
  useState,
  useCallback,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Typography } from '@material-ui/core';

import { CardContext } from 'context/CardContext';
import { CardItem } from './card';
import {
  getCards,
  updateCardPosition,
  updateCardStatus,
} from 'services/resources/request/card';
import { CardsContainer as Container, CardSC } from './sc';
import { Card, CardActions } from 'services/resources/model/card.model';

interface Props {
  columnId: string;
  // draggableCard: null | CardType;
  // setDraggableCard: Dispatch<SetStateAction<CardType | null>>;
}

export const CardsContainer: React.FC<Props> = ({ columnId }) => {
  const { cards: allCards } = useContext(CardContext);
  const cardsData = allCards[columnId];

  const [isPointCards, setPointCards] = useState(false);

  // const dragStartHandler = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   card: CardType
  // ) => {
  //   e.stopPropagation();
  //   setDraggableCard(card);
  //   setPointCards(true);
  // };

  // const dropHandler = (e: React.DragEvent<HTMLDivElement>, card: CardType) => {
  //   e.preventDefault();
  //   setDraggableCard(null);
  //   setPointCards(false);
  //   dispatchStyles({ type: 'RESET_BACKGROUND', payload: card.id });
  //   if (draggableCard && draggableCard.columnId !== card.columnId) {
  //     dispatch(
  //       changeCardStatus({
  //         cardId: draggableCard.id,
  //         columnId: draggableCard.columnId,
  //         newColumnId: card.columnId,
  //         newPosition: card.position,
  //       })
  //     );
  //     return;
  //   }
  //   if (draggableCard && draggableCard.position !== card.position) {
  //     dispatch(
  //       changeCardPosition({
  //         columnId: draggableCard.columnId,
  //         cardId: draggableCard.id,
  //         newPosition: card.position,
  //       })
  //     );
  //   }
  // };

  return (
    <Droppable
      droppableId={columnId}
      mode="virtual"
      type="cards"
      renderClone={(provided, snapshot, rubric) => (
        <CardSC.Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Typography>{cardsData[rubric.source.index].name}</Typography>
        </CardSC.Container>
      )}
    >
      {(provided) => (
        <div
          key={columnId}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <Container>
            {cardsData?.map((el, index) => (
              <Draggable key={el.id} draggableId={el.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={provided.draggableProps.style}
                  >
                    <CardItem
                      cardId={el.id}
                      description={el.description}
                      name={el.name}
                      cardPosition={el.position}
                      columnId={columnId}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </Container>
        </div>
      )}
    </Droppable>
  );
};

// <DragWrapper
//   key={el.id}
//   isPointCards={isPointCards}
//   draggable
//   onDragStart={(e) => dragStartHandler(e, el)}
//   onDragEnd={() => dragEndHandler(el)}
//   onDragLeave={() => dragLeaveHandler(el)}
//   onDragEnter={dragEnterHandler}
//   onDragOver={(e) => dragOverHandler(e, el)}
//   onDrop={(e) => dropHandler(e, el)}
// ></DragWrapper>;
