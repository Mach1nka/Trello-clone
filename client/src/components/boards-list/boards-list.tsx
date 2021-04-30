import React from 'react';
import { Container, Card, Typography } from '@material-ui/core';
import BoardItem from './board-item';
import { useStyles } from './constants';
import { CardContainer } from './sc';

const BoardsList: React.FC = () => {
  const classes = useStyles();
  return (
    <Container>
      <Card className={classes.cardContainer}>
        <Typography gutterBottom color="secondary" variant="h5" component="h5">
          My Boards
        </Typography>
        <CardContainer>
          <BoardItem isDefaultCard boardName="create new board" />
          <BoardItem boardName="My new board" />
        </CardContainer>
      </Card>
    </Container>
  );
};

export default BoardsList;
