import { useContext } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Typography } from '@material-ui/core';

import { CardContext } from 'context/CardContext';
import {
  updateCardPosition,
  updateCardStatus,
} from 'services/resources/request/card';
import { Card, CardActions } from 'services/resources/model/card.model';
import { CardSC, CardsContainer as Container, CardHeight } from './sc';
import { MemoizedRow } from './row';

interface Props {
  columnId: string;
  cards: Card[];
}

export const CardsContainer: React.FC<Props> = ({ columnId, cards }) => {
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
          <Typography variant="subtitle2">
            {cards[rubric.source.index].name}
          </Typography>
        </CardSC.Container>
      )}
    >
      {(provided, snapshot) => {
        const listHeight = snapshot.isDraggingOver
          ? snapshot.draggingOverWith === snapshot.draggingFromThisWith
            ? cards.length * CardHeight
            : (cards.length + 1) * CardHeight
          : cards.length * CardHeight;

        return (
          <Container
            key={columnId}
            {...provided.droppableProps}
            height={listHeight || 10}
            width={254}
            itemCount={cards.length}
            itemSize={CardHeight}
            outerRef={provided.innerRef}
            itemData={cards}
          >
            {MemoizedRow}
          </Container>
        );
      }}
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
