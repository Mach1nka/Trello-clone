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
import { Column, ColumnActions } from 'services/resources/model/column.model';
import { updateColumnPosition } from 'services/resources/request/column';
import { ErrorInfo } from 'services/HttpService/types';
import { ColumnItem } from './column';
import { CreateColumn } from './createNewColumn';
import { ColumnsContainer as SC } from './sc';
import { CardDetails } from 'components/cards/modal/details';
import { getRouterQuery } from 'utils/getRouterQuery';

export const ColumnsContainer: React.FC = () => {
  const { setLoaderState } = useContext(LoaderContext);
  const { columns, dispatch: columnDispatch } = useContext(ColumnContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const { query } = useRouter();

  const boardId = getRouterQuery(query, 'boardId');

  const [columnsForDisplay, setColumns] = useState<Column[]>(columns);

  const updateColumnDisplay = useCallback(
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

  useEffect(() => {
    setLoaderState(false);
  }, []);

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
      if (data.destination && data.source.index !== data.destination?.index) {
        updateColumnDisplay(data);
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
    },
    [query.boardId, columns]
  );

  return (
    <ModalProvider>
      <SC.Container>
        <DragDropContext onDragEnd={(res) => onDropHandler(res)}>
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
