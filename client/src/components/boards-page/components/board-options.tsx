import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ShareIcon from '@material-ui/icons/Share';
import { CircularProgress } from '@material-ui/core';

import RenameBoardModal from './rename-board';
import { useAppSelector } from '../../../store/hooks';
import { deleteBoard } from '../../../store/board/actions';
import { setModalsStates, setModalData } from '../../../store/modals/actions';
import { BoardSC as SC } from '../sc';

interface Props {
  boardId: string;
}

const BoardOptions: React.FC<Props> = ({ boardId }) => {
  const [isOpenRenameModal, setRenameModalView] = useState(false);
  const [isOpenBackdrop, setBackdropView] = useState(false);
  const dispatch = useDispatch();
  const { id } = useAppSelector((state) => state.authData);

  return (
    <>
      <SC.BoardOptions>
        <SC.EditBoardButton
          aria-label="delete board"
          onClick={(e) => {
            e.preventDefault();
            setBackdropView(true);
            dispatch(deleteBoard({ userId: id, boardId }));
          }}
        >
          <DeleteIcon fontSize="inherit" />
        </SC.EditBoardButton>
        <SC.EditBoardButton
          aria-label="share board"
          onClick={(e) => {
            e.preventDefault();
            dispatch(setModalData({ boardId }));
            dispatch(setModalsStates({ isShareModalVisible: true }));
          }}
        >
          <ShareIcon fontSize="inherit" />
        </SC.EditBoardButton>
        <SC.EditBoardButton
          aria-label="rename board"
          onClick={(e) => {
            e.preventDefault();
            setRenameModalView(true);
          }}
        >
          <EditIcon fontSize="inherit" />
        </SC.EditBoardButton>
      </SC.BoardOptions>
      <RenameBoardModal
        isOpen={isOpenRenameModal}
        setModalView={setRenameModalView}
        boardId={boardId}
        userId={id}
      />
      <SC.Backdrop open={isOpenBackdrop}>
        <CircularProgress color="inherit" />
      </SC.Backdrop>
    </>
  );
};

export default BoardOptions;
