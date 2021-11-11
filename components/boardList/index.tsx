import { useEffect, useState, useContext } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Container, Typography } from '@material-ui/core';

import { BoardItem } from './boardItem';
import { getBoards } from 'services/resources/request/board';
import { BoardContext } from 'context/BoardContext';
import { LoaderContext } from 'context/LoaderContext';
// import { deleteColumnsData } from '../../store/column/actions';
// import { deleteCardsData } from '../../store/card/actions';
// import { resetModalData } from '../../store/modals/actions';
import { BoardsContainer, BoardSC as SC } from './sc';

export const BoardsList: React.FC = () => {
  const { setLoaderState } = useContext(LoaderContext);
  const {
    ownBoards,
    sharedBoards,
    dispatch: boardDispatch,
  } = useContext(BoardContext);
  const [backdropState, setBackdropState] = useState(true);

  useEffect(() => {
    // dispatch(deleteColumnsData());
    // dispatch(deleteCardsData());
    // dispatch(resetModalData());
    const timer = setTimeout(() => {
      //   setLoaderState(ownBoards.length || sharedBoards.length ? false : );
    }, 800);
    return () => clearTimeout(timer);
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

/* open={ownBoards.length || sharedBoards.length ? false : backdropState} */
