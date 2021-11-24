import React, { useState, useCallback } from 'react';
import Link from 'next/link';

import { BoardOptions } from './boardOptions';
import { CreateBoardModal } from './modal/create';
// import { deleteColumnsData } from '../../../store/column/actions';
import { BoardSC as SC } from './sc';

interface Props {
  isDefaultCard?: boolean;
  boardName: string;
  boardId?: string;
  isOwnBoards?: boolean;
}

export const BoardItem: React.FC<Props> = ({
  isDefaultCard,
  boardName,
  boardId,
  isOwnBoards,
}) => {
  const [isOpenModal, setModalView] = useState(false);

  // const resetColumnsData = useCallback(() => dispatch(deleteColumnsData()), []);
  const showCreatingModal = useCallback(() => setModalView(true), []);

  if (!isDefaultCard && boardId && isOwnBoards) {
    const locationParams = {
      pathname: `/boards/board/${boardId}`,
      query: { boardName },
    };

    return (
      <Link
        href={locationParams}
        // onClick={resetColumnsData} @note reset column context
      >
        <a style={{ textDecoration: 'none' }}>
          <SC.Board isDefaultCard={isDefaultCard}>
            <SC.Name color="inherit" variant="subtitle2" align="left">
              {boardName}
            </SC.Name>
            <BoardOptions boardId={boardId} />
          </SC.Board>
        </a>
      </Link>
    );
  }
  if (!isDefaultCard && !isOwnBoards && boardId) {
    const locationParams = {
      pathname: `/boards/board/${boardId}`,
      state: { boardName, boardId },
    };

    return (
      <Link
        href={locationParams}
        // onClick={resetColumnsData} @note reset column context
      >
        <a style={{ textDecoration: 'none' }}>
          <SC.Board isDefaultCard={isDefaultCard}>
            <SC.Name color="inherit" variant="subtitle2" align="left">
              {boardName}
            </SC.Name>
          </SC.Board>
        </a>
      </Link>
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
