import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation, Location } from 'react-router-dom';

import ShareBoardModal from '../boards-page/components/share-board';
import Sidebar from './sidebar';
import { useAppSelector } from '../../store/hooks';
import { getBoards } from '../../store/board/actions';
import { setModalsStates, setBoardIdForModal } from '../../store/modals/actions';
import { removeAuthDataFromLocalStorage } from '../../../utils/auth-data-localstorage';
import resetStore from '../../../utils/reset-store';
import useWindowSize from '../../../utils/window-size-hook';
import { HeaderSC as SC } from './sc';

interface MyLocation extends Location {
  state: {
    boardName: string;
    boardId: string;
  };
}

const Header: React.FC = () => {
  const { pathname, state } = useLocation() as MyLocation;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { width } = useWindowSize();
  const { ownBoards, sharedBoards } = useAppSelector((data) => data.userBoards);

  const pathLength = 14;
  const boardName = pathname.slice(0, pathLength) === '/boards/board/' ? state?.boardName : '';
  const boardId = pathname.slice(0, pathLength) === '/boards/board/' ? state?.boardId : '';
  const isOwnBoard = ownBoards.findIndex((el) => el.id === boardId);
  const isMainPage = pathname === '/boards';

  const handleShareButton = useCallback(() => {
    dispatch(setBoardIdForModal({ boardId }));
    dispatch(setModalsStates({ isShareModalVisible: true }));
  }, [boardId]);

  const handleLogOut = useCallback(() => {
    resetStore();
    removeAuthDataFromLocalStorage();
    navigate('/auth');
  }, []);

  const handleBoardsButton = useCallback(() => {
    navigate('/boards');
  }, []);

  useEffect(() => {
    console.log(ownBoards.length);
    if (!ownBoards.length && !sharedBoards.length) {
      getBoards();
    }
  }, [boardId]);

  const controls = !isMainPage ? (
    <>
      {width && width >= 768 ? (
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
          <SC.NavButton onClick={handleLogOut} variant="outlined" color="default">
            Log Out
          </SC.NavButton>
        </SC.ToolBar>
      </SC.AppBar>
      <ShareBoardModal />
    </>
  );
};

export default Header;
