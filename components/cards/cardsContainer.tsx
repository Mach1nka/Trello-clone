import ReactDOM from 'react-dom';
import { Droppable } from 'react-beautiful-dnd';
import { Typography } from '@material-ui/core';

import { Card } from 'services/resources/model/card.model';
import { CardSC, CardsContainer as Container, CardHeight } from './sc';
import { getRowRender } from './row';

interface Props {
  columnId: string;
  cards: Card[];
}

export const CardsContainer: React.FC<Props> = ({ columnId, cards }) => {
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
        const listHeight: number = snapshot.isDraggingOver
          ? snapshot.draggingOverWith === snapshot.draggingFromThisWith
            ? cards.length * CardHeight
            : (cards.length + 1) * CardHeight
          : cards.length * CardHeight;

        const itemCount: number = snapshot.isUsingPlaceholder
          ? cards.length + 1
          : cards.length;

        return (
          <Container
            key={columnId}
            height={listHeight || 10}
            width={254}
            rowCount={itemCount}
            rowHeight={CardHeight}
            style={{ overflowY: 'auto' }}
            ref={(ref: any) => {
              // react-virtualized has no way to get the list's ref that I can so
              // So we use the `ReactDOM.findDOMNode(ref)` escape hatch to get the ref
              if (ref) {
                // eslint-disable-next-line react/no-find-dom-node
                const whatHasMyLifeComeTo = ReactDOM.findDOMNode(ref);
                if (whatHasMyLifeComeTo instanceof HTMLElement) {
                  provided.innerRef(whatHasMyLifeComeTo);
                }
              }
            }}
            rowRenderer={getRowRender(cards)}
          />
        );
      }}
    </Droppable>
  );
};
