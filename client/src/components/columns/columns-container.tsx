import React, { useEffect, useState, useCallback, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { CircularProgress } from '@material-ui/core';

import Column from './components/column';
import CreateColumn from './components/create-column-button';
import ModalsContainer from '../cards/components/modals-container';
import { useAppSelector } from '../../store/hooks';
import { getColumns, changeColumnPosition } from '../../store/column/actions';
import { changeCardStatus } from '../../store/card/actions';
import { Card as CardType } from '../../store/card/types';
import { Column as ColumnType } from '../../store/column/types';
import { ColumnsContainer as Container, DragWrapper, ColumnSC as SC } from './sc';

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

const ColumnsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [draggableCard, setDraggableCard] = useState<CardType | null>(null);
  const [draggableColumn, setDraggableColumn] = useState<ColumnType | null>(null);
  const [isPointColumns, setPointColumns] = useState(false);
  const [backdropState, setBackdropState] = useState(true);

  const { boardId } = useParams<ParamTypes>();

  const { columns } = useAppSelector((state) => state.boardColumns);
  const columnForDnD = useAppSelector((state) => state.cardsData);

  const stylesReducer = useCallback((state: ColumnStyles, action: ActionStylesReducer) => {
    switch (action.type) {
      case 'SET_BACKGROUND':
        return {
          columnId: action.payload,
          backgroundColor: 'rgba(0,0,0,0.2)'
        };
      case 'RESET_BACKGROUND':
        return {
          columnId: action.payload,
          backgroundColor: 'none'
        };
      default:
        return state;
    }
  }, []);

  const [styles, dispatchStyles] = useReducer(stylesReducer, {
    columnId: '',
    backgroundColor: 'none'
  });

  const changeStatus = useCallback(
    (column: ColumnType) => {
      dispatch(
        changeCardStatus({
          cardId: draggableCard.id,
          columnId: draggableCard.columnId,
          newColumnId: column.id
        })
      );
      setDraggableCard(null);
      dispatchStyles({ type: 'RESET_BACKGROUND', payload: column.id });
    },
    [draggableCard]
  );

  const changePosition = useCallback(
    (column: ColumnType) => {
      dispatch(
        changeColumnPosition({
          boardId,
          columnId: draggableColumn.id,
          newPosition: column.position
        })
      );
      setDraggableColumn(null);
    },
    [draggableColumn]
  );

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, column: ColumnType) => {
    e.preventDefault();
    const isEmptyColumn = columnForDnD[column.id].length;
    if (draggableCard && !isEmptyColumn) {
      changeStatus(column);
      return;
    }
    if (draggableColumn && column.position !== draggableColumn.position) {
      changePosition(column);
    }
    dispatchStyles({ type: 'RESET_BACKGROUND', payload: column.id });
  };

  const dragStartHandler = (column: ColumnType) => {
    if (!draggableCard) {
      setDraggableColumn(column);
      setPointColumns(true);
    }
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>, column: ColumnType) => {
    e.preventDefault();
    if (!draggableCard && draggableColumn) {
      if (column.id !== styles.columnId || styles.backgroundColor === 'none') {
        dispatchStyles({ type: 'SET_BACKGROUND', payload: column.id });
      }
    }
  };

  const dragEnterHandler = useCallback(() => {
    if (!draggableCard && draggableColumn) {
      setPointColumns(true);
    }
  }, []);

  const dragLeaveHandler = (column: ColumnType) => {
    if (!draggableCard && draggableColumn) {
      dispatchStyles({ type: 'RESET_BACKGROUND', payload: column.id });
    }
  };

  const dragEndHandler = (column: ColumnType) => {
    setPointColumns(false);
    setDraggableColumn(null);
    if (!draggableCard && draggableColumn) {
      dispatchStyles({ type: 'RESET_BACKGROUND', payload: column.id });
    }
  };

  useEffect(() => {
    dispatch(getColumns(boardId));
    const timer = setTimeout(() => {
      setBackdropState(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Container>
        {columns.map((el) => (
          <DragWrapper
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
            <Column
              columnName={el.name}
              columnId={el.id}
              boardId={boardId}
              position={el.position}
              draggableCard={draggableCard}
              setDraggableCard={setDraggableCard}
              dragStyles={styles}
            />
          </DragWrapper>
        ))}
        <CreateColumn boardId={boardId} newPosition={columns.length} />
      </Container>
      <ModalsContainer />
      <SC.Backdrop open={columns.length ? false : backdropState}>
        <CircularProgress color="inherit" />
      </SC.Backdrop>
    </>
  );
};

export default ColumnsContainer;
