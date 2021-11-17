import { useEffect, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { removeCookies } from 'cookies-next';

import { BoardContext } from 'context/BoardContext';
import { ShareBoardModal } from '../../boardList/shareBoard';
import { Sidebar } from './sidebar';
import { getBoards } from 'services/resources/request/board';
import { useLogout } from 'utils/logout';
import { HeaderSC as SC } from './sc';
import { httpService } from 'services/HttpService';

interface Location {
  state: {
    boardName: string;
    boardId: string;
  };
  pathname: string;
}

export const Header: React.FC = () => {
  const { ownBoards } = useContext(BoardContext);
  const [modalView, setModalView] = useState(false);
  const { query, pathname, push: routerPush } = useRouter();
  const [mobileState, setMobileState] = useState(false);

  const { logout } = useLogout();

  const pathLength = 14;
  const boardName = (
    pathname.slice(0, pathLength) === '/boards/board/' ? query.boardName : ''
  ) as string;
  const boardId = (
    pathname.slice(0, pathLength) === '/boards/board/' ? query.boardId : ''
  ) as string;
  const isOwnBoard = ownBoards.findIndex((el) => el.id === boardId);
  const isMainPage = pathname === '/boards';

  const handleShareButton = useCallback(() => {
    setModalView(true);
    // dispatch(setBoardIdForModal({ boardId }));
    // dispatch(setModalsStates({ isShareModalVisible: true }));
  }, [boardId]);

  const handleLogOut = useCallback(() => {
    logout();
    removeCookies('token');
    routerPush('/login');
  }, [logout]);

  const handleBoardsButton = useCallback(() => {
    routerPush('/boards');
  }, []);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth <= 768
        ? setMobileState(true)
        : setMobileState(false);
    };

    window.addEventListener('resize', () => setResponsiveness());

    return () => {
      window.removeEventListener('resize', () => setResponsiveness());
    };

    // console.log(ownBoards.length);
    // if (!ownBoards.length && !sharedBoards.length) {
    //   getBoards();
    // }
  }, []);

  const controls = !isMainPage ? (
    <>
      {!mobileState ? (
        <>
          <div>
            <SC.NavButton
              style={{ marginRight: '10px' }}
              onClick={handleBoardsButton}
              variant="outlined"
            >
              Boards
            </SC.NavButton>
            {isOwnBoard !== -1 && (
              <SC.NavButton onClick={handleShareButton} variant="outlined">
                Share
              </SC.NavButton>
            )}
          </div>
          <SC.BoardName variant="h6">{boardName}</SC.BoardName>
        </>
      ) : (
        <Sidebar
          handleBoardsButton={handleBoardsButton}
          handleShareButton={handleShareButton}
          boardName={boardName}
          isOwnBoard={isOwnBoard}
        />
      )}
    </>
  ) : null;

  return (
    <>
      <SC.AppBar position="static">
        <SC.ToolBar>
          {controls}
          {!controls && <div />}
          <SC.NavButton
            onClick={handleLogOut}
            variant="outlined"
            color="default"
          >
            Log Out
          </SC.NavButton>
        </SC.ToolBar>
      </SC.AppBar>
      <ShareBoardModal
        modalView={modalView}
        setModalView={setModalView}
        boardId={boardId}
      />
    </>
  );
};
