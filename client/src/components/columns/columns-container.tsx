import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { ColumnsContainer as Container } from './sc';
import { useAppSelector } from '../../store/hooks';
import { getColumns } from '../../store/column/actions';
import Column from './column';
import CreateColumn from './create-column-button';
import ModalsContainer from '../cards/modals-container';

interface ParamTypes {
  boardId: string;
}

const ColumnsContainer: React.FC = () => {
  const dispatch = useDispatch();
  const { boardId } = useParams<ParamTypes>();
  const { columns } = useAppSelector((state) => state.boardColumns);
  const columnCount = useAppSelector((state) => Object.keys(state.cardsData).length);

  useEffect(() => {
    dispatch(getColumns(boardId));
  }, []);

  return (
    <>
      <Container>
        {columns.map((el) => (
          <Column
            key={el.id}
            columnName={el.name}
            columnId={el.id}
            boardId={boardId}
            position={el.position}
          />
        ))}
        <CreateColumn boardId={boardId} newPosition={columns.length} />
      </Container>
      {columnCount ? <ModalsContainer /> : null}
    </>
  );
};

export default ColumnsContainer;
