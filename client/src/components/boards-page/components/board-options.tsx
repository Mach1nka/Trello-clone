import React, { useState, useCallback } from 'react';
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
  const dispatch = useDispatch();

  const [isOpenRenameModal, setRenameModalView] = useState(false);
  const [isOpenBackdrop, setBackdropView] = useState(false);
  const { id } = useAppSelector((state) => state.authData);

  const onDeleteHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBackdropView(true);
    dispatch(deleteBoard({ userId: id, boardId }));
  }, []);

  const onShareHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(setModalData({ boardId }));
    dispatch(setModalsStates({ isShareModalVisible: true }));
  }, []);

  const onRenameHandler = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setRenameModalView(true);
  }, []);

  return (
    <>
      <SC.BoardOptions>
        <SC.EditBoardButton aria-label="delete board" onClick={onDeleteHandler}>
          <DeleteIcon fontSize="inherit" />
        </SC.EditBoardButton>
        <SC.EditBoardButton aria-label="share board" onClick={onShareHandler}>
          <ShareIcon fontSize="inherit" />
        </SC.EditBoardButton>
        <SC.EditBoardButton aria-label="rename board" onClick={onRenameHandler}>
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
