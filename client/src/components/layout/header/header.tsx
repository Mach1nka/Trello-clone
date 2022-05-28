import React, { useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useLocation, Location } from 'react-router-dom';

// import ShareBoardModal from '../../home/components/share-board';
import Sidebar from './sidebar';
// import { getBoards } from '../../store/actions/board';
// import { setModalsStates, setBoardIdForModal } from '../../store/actions/modal';
import { clearToken } from '../../../utils/token-management';
import { cleaningStore } from '../../../utils/cleaning-store';
import useWindowSize from '../../../utils/window-size-hook';
import { HeaderSC as SC } from './sc';
import { useAppDispatch } from '../../../store';
import { selectBoardsData } from '../../../store/selectors';

interface MyLocation extends Location {
  state: {
    boardName: string;
    boardId: string;
  };
}

const Header: React.FC = () => {
  const { pathname, state } = useLocation() as MyLocation;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const { ownBoards, sharedBoards } = useSelector(selectBoardsData);

  const pathLength = 14;
  const boardName = pathname.slice(0, pathLength) === '/boards/board/' ? state?.boardName : '';
  const boardId = pathname.slice(0, pathLength) === '/boards/board/' ? state?.boardId : '';
  const isOwnBoard = ownBoards.some((el) => el.id === boardId);
  const isMainPage = pathname === '/boards';

  // const handleShareButton = useCallback(() => {
  //   dispatch(setBoardIdForModal({ boardId }));
  //   dispatch(setModalsStates({ isShareModalVisible: true }));
  // }, [boardId]);

  const handleLogOut = useCallback(() => {
    cleaningStore(dispatch);
    clearToken();
  }, []);

  const handleBoardsButton = useCallback(() => {
    navigate('/home');
  }, []);

  useEffect(() => {
    if (!ownBoards.length && !sharedBoards.length) {
      // getBoards();
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
            {isOwnBoard ? (
              <SC.NavButton
                onClick={() => {
                  /* handleShareButton() */
                }}
                variant="outlined"
              >
                Share
              </SC.NavButton>
            ) : null}
          </div>
          <SC.BoardName variant="h6">{boardName}</SC.BoardName>
        </>
      ) : (
        <Sidebar
          handleBoardsButton={handleBoardsButton}
          handleShareButton={() => {
            /* handleShareButton() */
          }}
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
      {/* <ShareBoardModal /> */}
    </>
  );
};

export default Header;
