import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Card, Typography } from '@material-ui/core';
import { useAppSelector } from '../../store/hooks';
import BoardItem from './board-item';
import { useStyles } from './constants';
import { getBoards } from '../../store/board/actions';
import { deleteColumnsData } from '../../store/column/actions';
import { deleteCardsData } from '../../store/card/actions';
import { resetModalData } from '../../store/data-for-modals/actions';
import { BoardsContainer } from './sc';

const BoardsList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { ownBoards, sharedBoards } = useAppSelector((state) => state.userBoards);

  useEffect(() => {
    dispatch(deleteColumnsData());
    dispatch(deleteCardsData());
    dispatch(getBoards());
    dispatch(resetModalData());
  }, []);

  return (
    <Container>
      <Card className={classes.boardsContainer}>
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
      </Card>
    </Container>
  );
};

export default BoardsList;
