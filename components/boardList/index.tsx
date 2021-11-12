import { useEffect, useContext } from 'react';
import { Container, Typography } from '@material-ui/core';

import { BoardItem } from './boardItem';
import { BoardContext } from 'context/BoardContext';
import { LoaderContext } from 'context/LoaderContext';
// import { deleteColumnsData } from '../../store/column/actions';
// import { deleteCardsData } from '../../store/card/actions';
// import { resetModalData } from '../../store/modals/actions';
import { BoardsContainer, BoardSC as SC } from './sc';

export const BoardsList: React.FC = () => {
  const { setLoaderState } = useContext(LoaderContext);
  const { ownBoards, sharedBoards } = useContext(BoardContext);

  useEffect(() => {
    setLoaderState(false);
    // dispatch(deleteColumnsData());
    // dispatch(deleteCardsData());
    // dispatch(resetModalData());
    //   setLoaderState(ownBoards.length || sharedBoards.length ? false : );
  }, []);

  return (
    <Container>
      <SC.Container>
        <Typography gutterBottom color="secondary" variant="h5" component="h5">
          My Boards
        </Typography>
        <BoardsContainer>
          <BoardItem isDefaultCard boardName="create new board" />
          {ownBoards.map((el) => (
            <BoardItem
              isOwnBoards
              key={el.id}
              boardName={el.name}
              boardId={el.id}
            />
          ))}
        </BoardsContainer>
        {sharedBoards.length ? (
          <>
            <Typography
              gutterBottom
              color="secondary"
              variant="h5"
              component="h5"
            >
              Shared Boards
            </Typography>
            <BoardsContainer>
              {sharedBoards.map((el) => (
                <BoardItem key={el.id} boardName={el.name} boardId={el.id} />
              ))}
            </BoardsContainer>
          </>
        ) : null}
      </SC.Container>
    </Container>
  );
};
