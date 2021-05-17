import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { ColumnsContainer as Container } from './sc';
import { useAppSelector } from '../../store/hooks';
import Column from './column';
import CreateColumn from './create-column-button';
import { getColumns } from '../../store/column/actions';

interface ParamTypes {
  boardId: string;
}

const ColumnsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams<ParamTypes>();
  const { columns, id: columnsContainerId } = useAppSelector((state) => state.boardColumns);

  useEffect(() => {
    dispatch(getColumns(boardId));
  }, []);

  return (
    <Container>
      {columns.map((el) => (
        <Column
          key={el._id}
          columnName={el.name}
          columnsContainerId={columnsContainerId}
          columnId={el._id}
          boardId={boardId}
          position={el.position}
        />
      ))}
      <CreateColumn boardId={boardId} newPosition={columns.length} />
    </Container>
  );
};

export default ColumnsContainer;
