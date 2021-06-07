import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { ColumnsContainer as Container } from './sc';
import { useAppSelector } from '../../store/hooks';
import Column from './column';
import CreateColumn from './create-column-button';
import { getColumns, Column as ColumnType } from '../../store/column/actions';
import { changeCardStatus, Card as CardType } from '../../store/card/actions';

interface ParamTypes {
  boardId: string;
}

const ColumnsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const [draggableCard, setDraggableCard] = useState<CardType | null>(null);
  const { boardId } = useParams<ParamTypes>();
  const { columns } = useAppSelector((state) => state.boardColumns);
  const columnToDnD = useAppSelector((state) => state.cardData.cards);

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, column: ColumnType) => {
    e.preventDefault();
    const isEmptyColumn = columnToDnD[column.id].length;
    if (draggableCard && !isEmptyColumn) {
      dispatch(
        changeCardStatus({
          cardId: draggableCard.id,
          columnId: draggableCard.columnId,
          newColumnId: column.id
        })
      );
      setDraggableCard(null);
    }
  };

  useEffect(() => {
    dispatch(getColumns(boardId));
  }, []);

  return (
    <Container>
      {columns.map((el) => (
        <div key={el.id} onDrop={(e) => dropHandler(e, el)} onDragOver={(e) => e.preventDefault()}>
          <Column
            columnName={el.name}
            columnId={el.id}
            boardId={boardId}
            position={el.position}
            draggableCard={draggableCard}
            setDraggableCard={setDraggableCard}
          />
        </div>
      ))}
      <CreateColumn boardId={boardId} newPosition={columns.length} />
    </Container>
  );
};

export default ColumnsContainer;
