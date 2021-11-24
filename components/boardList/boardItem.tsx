/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useContext } from 'react';
import Link from 'next/link';

import { LoaderContext } from 'context/LoaderContext';
import { BoardOptions } from './boardOptions';
import { CreateBoardModal } from './modal/create';
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
  const { setLoaderState } = useContext(LoaderContext);

  const [isOpenModal, setModalView] = useState(false);

  const showCreatingModal = useCallback(() => setModalView(true), []);
  const linkOnClick = useCallback(() => setLoaderState(true), []);

  if (!isDefaultCard && boardId && isOwnBoards) {
    const locationParams = {
      pathname: `/boards/board/${boardId}`,
      query: { boardName },
    };

    return (
      <Link href={locationParams}>
        <a style={{ textDecoration: 'none' }} onClick={linkOnClick}>
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
      <Link href={locationParams}>
        <a style={{ textDecoration: 'none' }} onClick={linkOnClick}>
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
