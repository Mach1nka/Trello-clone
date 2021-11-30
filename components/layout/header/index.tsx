import { useEffect, useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { removeCookies } from 'cookies-next';

import { LoaderContext } from 'context/LoaderContext';
import { BoardContext } from 'context/BoardContext';
import { ShareBoardModal } from '../../boardList/modal/share';
import { Sidebar } from './sidebar';
import { useLogout } from 'utils/logout';
import { HeaderSC as SC } from './sc';
import { getRouterQuery } from 'utils/getRouterQuery';

export const Header: React.FC = () => {
  const { ownBoards } = useContext(BoardContext);
  const { setLoaderState } = useContext(LoaderContext);

  const [modalView, setModalView] = useState(false);
  const [mobileState, setMobileState] = useState(false);

  const { query, pathname, push: routerPush } = useRouter();

  const { logout } = useLogout();

  const routerBoardName = getRouterQuery(query, 'boardName');
  const routerBoardId = getRouterQuery(query, 'boardId');

  const isOwnBoard = ownBoards.findIndex((el) => el.id === routerBoardId);
  const isMainPage = pathname === '/boards';

  const handleShareButton = useCallback(() => {
    setModalView(true);
  }, []);

  const handleLogOut = useCallback(() => {
    setLoaderState(true);
    removeCookies('authData');
    logout();
  }, []);

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
          <SC.BoardName variant="h6">{routerBoardName}</SC.BoardName>
        </>
      ) : (
        <Sidebar
          handleBoardsButton={handleBoardsButton}
          handleShareButton={handleShareButton}
          boardName={routerBoardName}
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
        boardId={routerBoardId}
      />
    </>
  );
};
