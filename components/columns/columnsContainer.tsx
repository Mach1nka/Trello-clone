import { useEffect, useState, useContext, useCallback } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
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
import { ErrorInfo } from 'services/HttpService/types';
import { ColumnItem } from './column';
import { CreateColumn } from './createNewColumn';
import { ColumnsContainer as SC } from './sc';
import { CardDetails } from 'components/cards/modal/details';
import { getRouterQuery } from 'utils/getRouterQuery';
import { Card } from 'services/resources/model/card.model';

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
        const columnCards: Card[] = allCards[source.droppableId];
        const draggableCard: Card | undefined = columnCards.find(
          (el) => el.id === draggableId
        );
        if (draggableCard) {
          const updatedCards: Card[] = columnCards;

          updatedCards.splice(source.index, 1);
          updatedCards.splice(destination.index, 0, draggableCard);
          console.log(updatedCards);

          setCards((prev) => ({
            ...prev,
            [source.droppableId]: updatedCards,
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
      console.log(data);
      if (data.type === 'column') {
        if (data.destination && data.source.index !== data.destination?.index) {
          updateColumnOrder(data);
          updateColumnPosition({
            boardId: boardId,
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
        return;
      }

      if (data.type === 'cards') {
        if (
          data.destination &&
          data.source.droppableId === data.destination.droppableId
        ) {
          updateCardOrderInSameList(data);
        }
        return;
      }
    },
    [query.boardId, columns]
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
        <CreateColumn boardId={boardId} newPosition={columns.length} />
      </SC.Container>
      <CardDetails />
    </ModalProvider>
  );
};
