import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Typography, CircularProgress, useTheme } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';

import BoardItem from './components/board-item';
import { useAppSelector } from '../../store/hooks';
import { getBoards } from '../../store/board/actions';
import { deleteColumnsData } from '../../store/column/actions';
import { deleteCardsData } from '../../store/card/actions';
import { resetModalData } from '../../store/modals/actions';
import { BoardsContainer, BoardSC as SC } from './sc';

const BoardsList: React.FC = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [backdropState, setBackdropState] = useState(true);
  const { ownBoards, sharedBoards } = useAppSelector((state) => state.userBoards);

  useEffect(() => {
    dispatch(deleteColumnsData());
    dispatch(deleteCardsData());
    dispatch(getBoards());
    dispatch(resetModalData());
    const timer = setTimeout(() => {
      setBackdropState(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <SC.Container>
          <Typography gutterBottom color="secondary" variant="h5" component="h5">
            My Boards
          </Typography>
          <BoardsContainer>
            <BoardItem isDefaultCard boardName="create new board" />
            {ownBoards.map((el) => (
              <BoardItem isOwnBoards key={el.id} boardName={el.name} boardId={el.id} />
            ))}
          </BoardsContainer>
          {sharedBoards.length ? (
            <>
              <Typography gutterBottom color="secondary" variant="h5" component="h5">
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
      <SC.Backdrop open={ownBoards.length || sharedBoards.length ? false : backdropState}>
        <CircularProgress color="inherit" />
      </SC.Backdrop>
    </ThemeProvider>
  );
};

export default BoardsList;
