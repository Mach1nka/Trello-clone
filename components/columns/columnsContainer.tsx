import React, { useEffect, useState, useContext, useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { useRouter } from 'next/router';

import {
  AlertActions,
  AlertContext,
  AlertStatusData,
} from 'context/AlertContext';
import { ColumnContext } from 'context/ColumnContext';
import { ColumnActions } from 'services/resources/model/column.model';
import { updateColumnPosition } from 'services/resources/request/column';
import { ErrorInfo } from 'services/HttpService/types';
import { ColumnItem } from './column';
import { CreateColumn } from './createNewColumn';
import { ColumnsContainer as SC } from './sc';
// import ModalsContainer from '../cards/components/modals-container';
// import { changeCardStatus } from '../../store/card/actions';
// import { Card as CardType } from '../../store/card/types';

interface ParamTypes {
  boardId: string;
}

export const ColumnsContainer: React.FC = () => {
  const { columns, dispatch: columnDispatch } = useContext(ColumnContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const { query } = useRouter();
  // const [draggableCard, setDraggableCard] = useState<CardType | null>(null);
  // const [draggableColumn, setDraggableColumn] = useState<ColumnType | null>(
  //   null
  // );

  // const columnForDnD = useAppSelector((state) => state.cardsData);

  // const changeStatus = useCallback(
  //   (column: ColumnType) => {
  //     dispatch(
  //       changeCardStatus({
  //         cardId: draggableCard.id,
  //         columnId: draggableCard.columnId,
  //         newColumnId: column.id,
  //       })
  //     );
  //     setDraggableCard(null);
  //     dispatchStyles({ type: 'RESET_BACKGROUND', payload: column.id });
  //   },
  //   [draggableCard]
  // );

  const onDropHandler = useCallback(
    (data: DropResult) => {
      if (data.destination && data.source.index !== data.destination?.index) {
        updateColumnPosition({
          boardId: query.boardId,
          columnId: data.draggableId,
          newPosition: data.destination.index,
        })
          .then((resp) => {
            columnDispatch({
              type: ColumnActions.PUT_COLUMNS,
              payload: resp.data,
            });
          })
          .catch((err: ErrorInfo) => {
            alertDispatch({
              type: AlertActions.ADD,
              payload: {
                id: `${Date.now()}`,
                message: err.message,
                status: AlertStatusData.ERROR,
              },
            });
          });
      }
    },
    [query.boardId]
  );

  return (
    <SC.Container>
      <DragDropContext onDragEnd={(res) => onDropHandler(res)}>
        <Droppable droppableId={query.boardId as string} direction="horizontal">
          {(provided, snapshot) => (
            <div
              style={{ display: 'flex' }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {columns.map((el, index) => (
                <Draggable key={el.id} draggableId={el.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={provided.draggableProps.style}
                    >
                      <ColumnItem
                        key={el.id}
                        columnName={el.name}
                        columnId={el.id}
                        boardId={query.boardId}
                        position={el.position}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <CreateColumn boardId={query.boardId} newPosition={columns.length} />
    </SC.Container>
  );
};

/* <ModalsContainer /> */

/* <DragWrapper
key={el.id}
isPointColumns={isPointColumns}
draggable
onDragStart={() => dragStartHandler(el)}
onDragLeave={() => dragLeaveHandler(el)}
onDragOver={(e) => dragOverHandler(e, el)}
onDragEnter={dragEnterHandler}
onDragEnd={() => dragEndHandler(el)}
onDrop={(e) => dropHandler(e, el)}
>
</DragWrapper> */
