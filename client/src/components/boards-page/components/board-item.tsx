import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import BoardOptions from './board-options';
import CreateBoardModal from './create-board';
import { deleteColumnsData } from '../../../store/column/actions';
import { BoardSC as SC } from '../sc';

interface Props {
  isDefaultCard?: boolean;
  boardName: string;
  boardId?: string;
  isOwnBoards?: boolean;
}

const BoardItem: React.FC<Props> = ({ isDefaultCard, boardName, boardId, isOwnBoards }) => {
  const [isOpenModal, setModalView] = useState(false);
  const dispatch = useDispatch();

  const resetColumnsData = useCallback(() => dispatch(deleteColumnsData()), []);
  const showCreatingModal = useCallback(() => setModalView(true), []);

  if (!isDefaultCard && boardId && isOwnBoards) {
    const locationParams = { pathname: `/boards/board/${boardId}`, state: { boardName, boardId } };

    return (
      <SC.Link style={{ textDecoration: 'none' }} to={locationParams} onClick={resetColumnsData}>
        <SC.Board isDefaultCard={isDefaultCard}>
          <SC.Name color="inherit" variant="subtitle2" align="left">
            {boardName}
          </SC.Name>
          <BoardOptions boardId={boardId} />
        </SC.Board>
      </SC.Link>
    );
  }
  if (!isDefaultCard && !isOwnBoards && boardId) {
    const locationParams = { pathname: `/boards/board/${boardId}`, state: { boardName, boardId } };

    return (
      <SC.Link style={{ textDecoration: 'none' }} to={locationParams} onClick={resetColumnsData}>
        <SC.Board isDefaultCard={isDefaultCard}>
          <SC.Name color="inherit" variant="subtitle2" align="left">
            {boardName}
          </SC.Name>
        </SC.Board>
      </SC.Link>
    );
  }
  return (
    <>
      <SC.Board onClick={showCreatingModal} isDefaultCard={isDefaultCard}>
        <SC.Name color="inherit" variant="subtitle2" align="left">
          {boardName}
        </SC.Name>
      </SC.Board>
      <CreateBoardModal isOpen={isOpenModal} setModalView={setModalView} />
    </>
  );
};

export default BoardItem;
