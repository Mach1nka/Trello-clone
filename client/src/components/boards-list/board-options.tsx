import React, { useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Fab } from '@material-ui/core';
import { useStyles } from './constants';
import { BoardOptions as Container } from './sc';
import RenameBoardModal from './modal';

interface Props {
  boardName: string;
}

const BoardOptions: React.FC<Props> = ({ boardName }) => {
  const [isOpenModal, setModalView] = useState(false);
  const classes = useStyles();
  return (
    <>
      <Container>
        <Fab className={classes.editBoardNameButton}>
          <DeleteIcon fontSize="inherit" />
        </Fab>
        <Fab className={classes.editBoardNameButton} onClick={() => setModalView(true)}>
          <EditIcon fontSize="inherit" />
        </Fab>
      </Container>
      <RenameBoardModal
        isOpen={isOpenModal}
        currentBoardName={boardName}
        setModalView={setModalView}
      />
    </>
  );
};

export default BoardOptions;
