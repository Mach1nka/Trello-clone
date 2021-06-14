import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import { Fab, Backdrop, CircularProgress } from '@material-ui/core';
import { useStyles } from './constants';
import { useAppSelector } from '../../store/hooks';
import { BoardOptions as Container } from './sc';
import RenameBoardModal from './rename-board';
import ShareBoardModal from './share-board';
import { deleteBoard } from '../../store/board/actions';

interface Props {
  boardId: string;
}

const BoardOptions: React.FC<Props> = ({ boardId }) => {
  const [isOpenRenameModal, setRenameModalView] = useState(false);
  const [isOpenShareModal, setShareModalView] = useState(false);
  const [isOpenBackdrop, setBackdropView] = useState(false);
  const dispatch = useDispatch();
  const { id } = useAppSelector((state) => state.authData);
  const classes = useStyles();

  return (
    <>
      <Container>
        <Fab
          onClick={(e) => {
            e.preventDefault();
            setBackdropView(true);
            dispatch(deleteBoard({ userId: id, boardId }));
          }}
          className={classes.editBoardNameButton}
        >
          <DeleteIcon fontSize="inherit" />
        </Fab>
        <Fab
          onClick={(e) => {
            e.preventDefault();
            setShareModalView(true);
          }}
          className={classes.editBoardNameButton}
        >
          <ShareIcon fontSize="inherit" />
        </Fab>
        <Fab
          className={classes.editBoardNameButton}
          onClick={(e) => {
            e.preventDefault();
            setRenameModalView(true);
          }}
        >
          <EditIcon fontSize="inherit" />
        </Fab>
      </Container>
      <ShareBoardModal
        isOpen={isOpenShareModal}
        setModalView={setShareModalView}
        boardId={boardId}
      />
      <RenameBoardModal
        isOpen={isOpenRenameModal}
        setModalView={setRenameModalView}
        boardId={boardId}
      />
      <Backdrop className={classes.backdrop} open={isOpenBackdrop}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default BoardOptions;
