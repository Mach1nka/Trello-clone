import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Fab, Backdrop, CircularProgress } from '@material-ui/core';
import { useStyles } from './constants';
import { useAppSelector } from '../../store/hooks';
import { BoardOptions as Container } from './sc';
import RenameBoardModal from './rename-board';
import { deleteBoard } from '../../store/board/actions';

interface Props {
  boardId: string;
}

const BoardOptions: React.FC<Props> = ({ boardId }) => {
  const [isOpenModal, setModalView] = useState(false);
  const [isOpenBackdrop, setBackdropView] = useState(false);
  const dispatch = useDispatch();
  const { id } = useAppSelector((state) => state.authData);
  const classes = useStyles();

  return (
    <>
      <Container>
        <Fab
          onClick={(evt) => {
            evt.preventDefault();
            setBackdropView(true);
            dispatch(deleteBoard({ userId: id, boardId }));
          }}
          className={classes.editBoardNameButton}
        >
          <DeleteIcon fontSize="inherit" />
        </Fab>
        <Fab
          className={classes.editBoardNameButton}
          onClick={(evt) => {
            evt.preventDefault();
            setModalView(true);
          }}
        >
          <EditIcon fontSize="inherit" />
        </Fab>
      </Container>
      <RenameBoardModal isOpen={isOpenModal} setModalView={setModalView} boardId={boardId} />
      <Backdrop className={classes.backdrop} open={isOpenBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default BoardOptions;
