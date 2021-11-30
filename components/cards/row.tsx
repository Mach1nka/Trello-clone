import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';

import { Card } from 'services/resources/model/card.model';
import { CardItem } from './card';

interface RowProps {
  index: number;
  style: StyleProps;
}

interface StyleProps {
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined;
  virtualStyle: Record<string, any>; // @note This type is not described in react-virtualized or react-dnd
}

const getStyle = ({ draggableStyle, virtualStyle }: StyleProps) => {
  const combined = {
    ...virtualStyle,
    ...draggableStyle,
    height: virtualStyle.height - 10,
    marginBottom: 10,
  };

  return combined;
};

const getRowRender =
  (cards: Card[]) =>
  // eslint-disable-next-line react/display-name
  ({ index, style }: RowProps): JSX.Element | null => {
    const item: Card = cards[index];

    if (!item) {
      return null;
    }

    return (
      <Draggable key={item.id} draggableId={item.id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={getStyle({
              draggableStyle: provided.draggableProps.style,
              virtualStyle: style,
            })}
          >
            <CardItem
              cardId={item.id}
              description={item.description}
              name={item.name}
              cardPosition={item.position}
              columnId={item.columnId}
            />
          </div>
        )}
      </Draggable>
    );
  };

export { getRowRender };
