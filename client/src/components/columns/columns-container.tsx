import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { ColumnsContainer as Container } from './sc';
import { useAppSelector } from '../../store/hooks';
import Column from './column';
import CreateColumn from './create-column-button';
import { getColumns, changeColumnPosition, Column as ColumnType } from '../../store/column/actions';

interface ParamTypes {
  boardId: string;
}

const ColumnsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams<ParamTypes>();
  const { columns } = useAppSelector((state) => state.boardColumns);
  const [dragEl, setDragEl] = useState<ColumnType | null>(null);

  const dragStartHandler = (column: ColumnType) => {
    setDragEl(column);
  };

  const draOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.currentTarget.firstChild) {
      e.currentTarget.firstChild.style.background = 'rgba(0,0,0,0.2)';
    }
  };

  const dragLeaveEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.currentTarget.firstChild) {
      e.currentTarget.firstChild.style.background = 'none';
    }
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, column: ColumnType) => {
    e.preventDefault();
    if (dragEl && column.position !== dragEl.position) {
      if (e.currentTarget.firstChild) {
        e.currentTarget.firstChild.style.background = 'none';
      }
      dispatch(
        changeColumnPosition({
          boardId,
          columnId: dragEl.id,
          newPosition: column.position
        })
      );
    }
  };

  useEffect(() => {
    dispatch(getColumns(boardId));
  }, []);

  return (
    <Container>
      {columns.map((el) => (
        <div
          key={el.id}
          draggable
          onDragStart={() => dragStartHandler(el)}
          onDragLeave={(e) => dragLeaveEndHandler(e)}
          onDragOver={(e) => draOverHandler(e)}
          onDragEnd={(e) => dragLeaveEndHandler(e)}
          onDrop={(e) => dropHandler(e, el)}
        >
          <Column columnName={el.name} columnId={el.id} boardId={boardId} position={el.position} />
        </div>
      ))}
      <CreateColumn boardId={boardId} newPosition={columns.length} />
    </Container>
  );
};

export default ColumnsContainer;
