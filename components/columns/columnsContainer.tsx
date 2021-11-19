import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useReducer,
} from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useRouter } from 'next/router';

import { LoaderContext } from 'context/LoaderContext';
import { ColumnContext } from 'context/ColumnContext';
import { Column } from './column';
import { Column as ColumnType } from 'services/resources/model/column.model';
import { CreateColumn } from './createNewColumn';
import { updateColumnPosition } from 'services/resources/request/column';
// import ModalsContainer from '../cards/components/modals-container';
// import { changeCardStatus } from '../../store/card/actions';
// import { Card as CardType } from '../../store/card/types';
import {
  ColumnsContainer as Container,
  DragWrapper,
  ColumnSC as SC,
} from './sc';

interface ParamTypes {
  boardId: string;
}

interface ColumnStyles {
  columnId: string;
  backgroundColor: string;
}

interface ActionStylesReducer {
  type: string;
  payload: string;
}

export const ColumnsContainer: React.FC = () => {
  const { setLoaderState } = useContext(LoaderContext);
  const { columns } = useContext(ColumnContext);

  const { query } = useRouter();
  const [isPointColumns, setPointColumns] = useState(false);
  // const [draggableCard, setDraggableCard] = useState<CardType | null>(null);
  // const [draggableColumn, setDraggableColumn] = useState<ColumnType | null>(
  //   null
  // );

  // const columnForDnD = useAppSelector((state) => state.cardsData);

  const stylesReducer = useCallback(
    (state: ColumnStyles, action: ActionStylesReducer) => {
      switch (action.type) {
        case 'SET_BACKGROUND':
          return {
            columnId: action.payload,
            backgroundColor: 'rgba(0,0,0,0.2)',
          };
        case 'RESET_BACKGROUND':
          return {
            columnId: action.payload,
            backgroundColor: 'none',
          };
        default:
          return state;
      }
    },
    []
  );

  const [styles, dispatchStyles] = useReducer(stylesReducer, {
    columnId: '',
    backgroundColor: 'none',
  });

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

  // const changePosition = useCallback(
  //   (column: ColumnType) => {
  //     dispatch(
  //       changeColumnPosition({
  //         boardId,
  //         columnId: draggableColumn.id,
  //         newPosition: column.position,
  //       })
  //     );
  //     setDraggableColumn(null);
  //   },
  //   [draggableColumn]
  // );

  // const dropHandler = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   column: ColumnType
  // ) => {
  //   e.preventDefault();
  //   const isEmptyColumn = columnForDnD[column.id].length;
  //   if (draggableCard && !isEmptyColumn) {
  //     changeStatus(column);
  //     return;
  //   }
  //   if (draggableColumn && column.position !== draggableColumn.position) {
  //     changePosition(column);
  //   }
  //   dispatchStyles({ type: 'RESET_BACKGROUND', payload: column.id });
  // };

  // const dragStartHandler = (column: ColumnType) => {
  //   if (!draggableCard) {
  //     setDraggableColumn(column);
  //     setPointColumns(true);
  //   }
  // };

  // const dragOverHandler = (
  //   e: React.DragEvent<HTMLDivElement>,
  //   column: ColumnType
  // ) => {
  //   e.preventDefault();
  //   if (!draggableCard && draggableColumn) {
  //     if (column.id !== styles.columnId || styles.backgroundColor === 'none') {
  //       dispatchStyles({ type: 'SET_BACKGROUND', payload: column.id });
  //     }
  //   }
  // };

  // const dragEnterHandler = useCallback(() => {
  //   if (!draggableCard && draggableColumn) {
  //     setPointColumns(true);
  //   }
  // }, []);

  // const dragLeaveHandler = (column: ColumnType) => {
  //   if (!draggableCard && draggableColumn) {
  //     dispatchStyles({ type: 'RESET_BACKGROUND', payload: column.id });
  //   }
  // };

  // const dragEndHandler = (column: ColumnType) => {
  //   setPointColumns(false);
  //   setDraggableColumn(null);
  //   if (!draggableCard && draggableColumn) {
  //     dispatchStyles({ type: 'RESET_BACKGROUND', payload: column.id });
  //   }
  // };

  // useEffect(() => {
  //   dispatch(getColumns(boardId));
  //   const timer = setTimeout(() => {
  //     setLoaderState(false);
  //   }, 800);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <Container>
      <DragDropContext onDragEnd={(res) => console.log(res)}>
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
                      style={{ ...provided.draggableProps.style }}
                    >
                      <Column
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
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <CreateColumn boardId={query.boardId} newPosition={columns.length} />
    </Container>
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
