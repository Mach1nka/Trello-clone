import { NamedExoticComponent, memo } from 'react';
import {
  Draggable,
  DraggingStyle,
  NotDraggingStyle,
} from 'react-beautiful-dnd';
import { areEqual } from 'react-window';

import { Card } from 'services/resources/model/card.model';
import { CardItem } from './card';

interface RowProps {
  data: Card[];
  index: number;
  style: StyleProps;
}

interface StyleProps {
  draggableStyle: DraggingStyle | NotDraggingStyle | undefined;
  virtualStyle: Record<string, any>; // @note This type is not described in react-window or react-dnd
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

const Row: React.FC<RowProps> = ({ data: items, index, style }) => {
  const item: Card = items[index];

  console.log(style);

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

export const MemoizedRow: NamedExoticComponent<RowProps> = memo(Row, areEqual);
