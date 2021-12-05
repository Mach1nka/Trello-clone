import { useEffect, useState, useContext, useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
} from 'react-beautiful-dnd';
import { useRouter } from 'next/router';

import ModalProvider from 'context/ModalContext';
import {
  AlertActions,
  AlertContext,
  AlertStatusData,
} from 'context/AlertContext';
import { LoaderContext } from 'context/LoaderContext';
import { ColumnContext } from 'context/ColumnContext';
import { CardContext } from 'context/CardContext';
import { Column, ColumnActions } from 'services/resources/model/column.model';
import { updateColumnPosition } from 'services/resources/request/column';
import {
  updateCardPosition,
  updateCardStatus,
} from 'services/resources/request/card';
import { ErrorInfo } from 'services/HttpService/types';
import { ColumnItem } from './column';
import { CreateColumn } from './createNewColumn';
import { ColumnsContainer as SC } from './sc';
import { CardDetails } from 'components/cards/modal/details';
import { getRouterQuery } from 'utils/getRouterQuery';
import { Card, CardActions } from 'services/resources/model/card.model';

export const ColumnsContainer: React.FC = () => {
  const { setLoaderState } = useContext(LoaderContext);
  const { columns, dispatch: columnDispatch } = useContext(ColumnContext);
  const { cards: allCards, dispatch: cardDispatch } = useContext(CardContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const { query } = useRouter();

  const boardId = getRouterQuery(query, 'boardId');

  const [columnsForDisplay, setColumns] = useState<Column[]>(columns);
  const [cardsForDisplay, setCards] =
    useState<{ [x: string]: Card[] }>(allCards);

  const updateColumnOrder = useCallback(
    ({ destination, source, draggableId }: DropResult) => {
      if (destination) {
        const draggableColumn = columns.find((el) => el.id === draggableId);
        if (draggableColumn) {
          const updatedColumns = columns;

          updatedColumns.splice(source.index, 1);
          updatedColumns.splice(destination.index, 0, draggableColumn);

          setColumns(updatedColumns);
        }
      }
    },
    [columns]
  );

  const updateCardOrderInSameList = useCallback(
    ({ destination, source, draggableId }: DropResult) => {
      if (destination) {
        const sourceColumn: Card[] = allCards[source.droppableId];
        const draggableCard: Card | undefined = sourceColumn.find(
          (el) => el.id === draggableId
        );
        if (draggableCard) {
          const updatedCards: Card[] = sourceColumn;

          updatedCards.splice(source.index, 1);
          updatedCards.splice(destination.index, 0, draggableCard);

          setCards((prev) => ({
            ...prev,
            [source.droppableId]: updatedCards,
          }));
        }
      }
    },
    [allCards]
  );

  const updateCardOrderBetweenList = useCallback(
    ({ destination, source, draggableId }: DropResult) => {
      if (destination) {
        const sourceColumn: Card[] = allCards[source.droppableId];
        const destinationColumn: Card[] = allCards[destination.droppableId];
        const draggableCard: Card | undefined = sourceColumn.find(
          (el) => el.id === draggableId
        );
        if (draggableCard) {
          const newSourceColumn = sourceColumn;
          newSourceColumn.splice(source.index, 1);

          const newDestinationColumn = destinationColumn;
          newDestinationColumn.splice(destination.index, 0, draggableCard);

          setCards((prev) => ({
            ...prev,
            [source.droppableId]: newSourceColumn,
            [destination.droppableId]: newDestinationColumn,
          }));
        }
      }
    },
    [allCards]
  );

  useEffect(() => {
    setLoaderState(false);
  }, []);

  useEffect(() => {
    setCards(allCards);
  }, [allCards]);

  useEffect(() => {
    setColumns(columns);
  }, [columns]);

  const onDropHandler = useCallback(
    (data: DropResult) => {
      const source: DraggableLocation = data.source;
      const destination: DraggableLocation | undefined = data.destination;

      if (data.type === 'column') {
        if (destination && source.index !== destination?.index) {
          updateColumnOrder(data);
          updateColumnPosition({
            boardId: boardId,
            columnId: data.draggableId,
            newPosition: destination.index,
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
        return;
      }

      if (data.type === 'cards') {
        if (destination) {
          if (source.droppableId === destination.droppableId) {
            updateCardOrderInSameList(data);
            updateCardPosition({
              cardId: data.draggableId,
              columnId: destination.droppableId,
              newPosition: destination.index,
            })
              .then((resp) => {
                cardDispatch({
                  type: CardActions.PUT_CARDS,
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
            return;
          }
          updateCardOrderBetweenList(data);
          updateCardStatus({
            cardId: data.draggableId,
            columnId: source.droppableId,
            newColumnId: destination.droppableId,
            newPosition: destination.index,
          })
            .then((resp) => {
              cardDispatch({
                type: CardActions.PUT_CARDS,
                payload: resp.data.newColumn,
              });
              cardDispatch({
                type: CardActions.PUT_CARDS,
                payload: resp.data.oldColumn,
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
      }
    },
    [
      boardId,
      updateCardOrderBetweenList,
      updateCardOrderInSameList,
      updateColumnOrder,
    ]
  );

  return (
    <ModalProvider>
      <SC.Container>
        <DragDropContext onDragEnd={onDropHandler}>
          <Droppable droppableId={boardId} direction="horizontal" type="column">
            {(provided) => (
              <div
                style={{ display: 'flex' }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {columnsForDisplay.map((el, index) => (
                  <Draggable key={el.id} draggableId={el.id} index={index}>
                    {(provided) => (
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
                          boardId={boardId}
                          position={el.position}
                          cards={cardsForDisplay[el.id] || []}
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
        <CreateColumn boardId={boardId} />
      </SC.Container>
      <CardDetails />
    </ModalProvider>
  );
};
