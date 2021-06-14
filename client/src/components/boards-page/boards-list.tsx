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
import { CardContainer } from './sc';

const BoardsList: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { boards } = useAppSelector((state) => state.userBoards);

  useEffect(() => {
    dispatch(deleteColumnsData());
    dispatch(deleteCardsData());
    dispatch(getBoards());
    dispatch(resetModalData());
  }, []);

  return (
    <Container>
      <Card className={classes.cardContainer}>
        <Typography gutterBottom color="secondary" variant="h5" component="h5">
          My Boards
        </Typography>
        <CardContainer>
          <BoardItem isDefaultCard boardName="create new board" />
          {boards.map((el) => (
            <BoardItem key={el.id} boardName={el.name} boardId={el.id} />
          ))}
        </CardContainer>
      </Card>
    </Container>
  );
};

export default BoardsList;
