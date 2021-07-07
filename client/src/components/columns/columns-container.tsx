import React, { useEffect, useState } from 'react';
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

const ColumnsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [draggableCard, setDraggableCard] = useState<CardType | null>(null);
  const [draggableColumn, setDraggableColumn] = useState<ColumnType | null>(null);
  const [isPointColumns, setPointColumns] = useState(false);
  const [backdropState, setBackdropState] = useState(true);

  const { boardId } = useParams<ParamTypes>();

  const { columns } = useAppSelector((state) => state.boardColumns);
  const columnForDnD = useAppSelector((state) => state.cardsData);

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, column: ColumnType) => {
    e.preventDefault();
    const isEmptyColumn = columnForDnD[column.id].length;
    if (draggableCard && !isEmptyColumn) {
      dispatch(
        changeCardStatus({
          cardId: draggableCard.id,
          columnId: draggableCard.columnId,
          newColumnId: column.id
        })
      );
      setDraggableCard(null);
      e.currentTarget.firstChild.style.background = 'none';
      return;
    }
    if (draggableColumn && column.position !== draggableColumn.position) {
      dispatch(
        changeColumnPosition({
          boardId,
          columnId: draggableColumn.id,
          newPosition: column.position
        })
      );
      setDraggableColumn(null);
    }
    e.currentTarget.firstChild.style.background = 'none';
  };

  const dragStartHandler = (column: ColumnType) => {
    if (!draggableCard) {
      setDraggableColumn(column);
      setPointColumns(true);
    }
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!draggableCard && draggableColumn) {
      e.currentTarget.firstChild.style.background = 'rgba(0,0,0,0.2)';
    }
  };

  const dragEnterHandler = () => {
    if (!draggableCard && draggableColumn) {
      setPointColumns(true);
    }
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    if (!draggableCard && draggableColumn) {
      e.currentTarget.firstChild.style.background = 'none';
    }
  };

  const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    setPointColumns(false);
    setDraggableColumn(null);
    if (!draggableCard && draggableColumn) {
      e.currentTarget.firstChild.style.background = 'none';
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
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragOverHandler(e)}
            onDragEnter={() => dragEnterHandler()}
            onDragEnd={(e) => dragEndHandler(e)}
            onDrop={(e) => dropHandler(e, el)}
          >
            <Column
              columnName={el.name}
              columnId={el.id}
              boardId={boardId}
              position={el.position}
              draggableCard={draggableCard}
              setDraggableCard={setDraggableCard}
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
