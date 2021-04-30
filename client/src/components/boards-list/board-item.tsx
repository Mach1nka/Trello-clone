import React from 'react';
import { Typography } from '@material-ui/core';
import { Card } from './sc';
import { useStyles } from './constants';
import BoardOptions from './board-options';

interface Props {
  isDefaultCard?: boolean;
  boardName: string;
}

const BoardItem: React.FC<Props> = ({ isDefaultCard, boardName }) => {
  const classes = useStyles();
  const nameCapitalized = boardName.charAt(0).toUpperCase() + boardName.slice(1);
  return (
    <Card isDefaultCard={isDefaultCard}>
      <Typography color="inherit" className={classes.boardName} variant="subtitle2" align="left">
        {nameCapitalized}
      </Typography>
      {!isDefaultCard && <BoardOptions boardName={boardName} />}
    </Card>
  );
};

export default BoardItem;
