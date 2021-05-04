import React, { useState } from 'react';
import { Typography, Box } from '@material-ui/core';
import { Card } from './sc';
import { useStyles } from './constants';
import BoardOptions from './board-options';
import CreateBoardModal from './create-board';

interface Props {
  isDefaultCard?: boolean;
  boardName: string;
  boardId?: string;
}

const BoardItem: React.FC<Props> = ({ isDefaultCard, boardName, boardId }) => {
  const [isOpenModal, setModalView] = useState(false);
  const classes = useStyles();
  const nameCapitalized = boardName.charAt(0).toUpperCase() + boardName.slice(1);

  if (!isDefaultCard && boardId) {
    return (
      <Card isDefaultCard={isDefaultCard}>
        <Typography color="inherit" className={classes.boardName} variant="subtitle2" align="left">
          {nameCapitalized}
        </Typography>
        <BoardOptions boardId={boardId} />
      </Card>
    );
  }
  return (
    <>
      <Card onClick={() => setModalView(true)} isDefaultCard={isDefaultCard}>
        <Typography color="inherit" className={classes.boardName} variant="subtitle2" align="left">
          {nameCapitalized}
        </Typography>
      </Card>
      <CreateBoardModal isOpen={isOpenModal} setModalView={setModalView} />
    </>
  );
};

export default BoardItem;
