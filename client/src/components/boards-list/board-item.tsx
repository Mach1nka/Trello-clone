import React, { useState } from 'react';
import { Typography, Fab } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { Card } from './sc';
import { useStyles } from './constants';
import RenameBoardModal from './modal';

interface Props {
  isDefaultCard?: boolean;
  boardName: string;
}

const BoardItem: React.FC<Props> = ({ isDefaultCard, boardName }) => {
  const classes = useStyles();
  const [isOpenModal, setModalView] = useState(false);
  const nameCapitalized = boardName.charAt(0).toUpperCase() + boardName.slice(1);
  return (
    <Card isDefaultCard={isDefaultCard}>
      <Typography color="inherit" className={classes.boardName} variant="subtitle2" align="left">
        {nameCapitalized}
      </Typography>
      {!isDefaultCard && (
        <>
          <Fab
            color="secondary"
            onClick={() => setModalView(true)}
            className={classes.editBoardNameButton}
          >
            <EditIcon fontSize="inherit" color="action" />
          </Fab>
          <RenameBoardModal
            isOpen={isOpenModal}
            currentBoardName={boardName}
            setModalView={setModalView}
          />
        </>
      )}
    </Card>
  );
};

export default BoardItem;
