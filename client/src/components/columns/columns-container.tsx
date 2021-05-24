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
  const { columns, id: columnsContainerId } = useAppSelector((state) => state.boardColumns);
  const [dragEl, setDragEl] = useState<ColumnType | null>(null);

  const dragStartHandler = (e: React.DragEvent<HTMLDivElement>, column: ColumnType) => {
    setDragEl(column);
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, column: ColumnType) => {
    e.preventDefault();
    if (dragEl && column.position !== dragEl.position) {
      dispatch(
        changeColumnPosition({
          columnsContainerId,
          columnId: dragEl._id,
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
          key={el._id}
          draggable
          onDragStart={(e) => dragStartHandler(e, el)}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => dropHandler(e, el)}
        >
          <Column
            columnName={el.name}
            columnsContainerId={columnsContainerId}
            columnId={el._id}
            boardId={boardId}
            position={el.position}
          />
        </div>
      ))}
      <CreateColumn boardId={boardId} newPosition={columns.length} />
    </Container>
  );
};

export default ColumnsContainer;
