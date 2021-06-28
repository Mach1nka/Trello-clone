import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { useAppSelector } from '../../store/hooks';
import { useStyles } from './constants';
import resetStore from '../../../utils/reset-store';
import { setModalsStates, setModalData } from '../../store/modals/actions';
import ShareBoardModal from '../boards-page/components/share-board';
import Sidebar from './sidebar';
import { removeAuthDataFromLocalStorage } from '../../../utils/auth-data-localstorage';
import useWindowSize from '../../../utils/window-size-hook';
import { getBoards } from '../../store/board/actions';

interface Location {
  state: {
    boardName: string;
    boardId: string;
  };
  pathname: string;
}

const Header: React.FC = () => {
  const { pathname, state }: Location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const { width } = useWindowSize();
  const { ownBoards, sharedBoards } = useAppSelector((data) => data.userBoards);
  const pathLength = 14;
  const boardName = pathname.slice(0, pathLength) === '/boards/board/' ? state?.boardName : '';
  const boardId = pathname.slice(0, pathLength) === '/boards/board/' ? state?.boardId : '';
  const isOwnBoard = ownBoards.findIndex((el) => el.id === boardId);
  const isMainPage = pathname === '/boards';

  const handleShareButton = () => {
    dispatch(setModalData({ boardId }));
    dispatch(setModalsStates({ isShareModalVisible: true }));
  };

  const handleLogOut = () => {
    resetStore();
    removeAuthDataFromLocalStorage();
    history.push('/auth');
  };

  const handleBoardsButton = () => {
    history.push('/boards');
  };

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
            <Button
              style={{ marginRight: '10px' }}
              onClick={handleBoardsButton}
              variant="outlined"
              classes={{ root: classes.navButton }}
            >
              Boards
            </Button>
            {isOwnBoard !== -1 && (
              <Button
                onClick={handleShareButton}
                variant="outlined"
                classes={{ root: classes.navButton }}
              >
                Share
              </Button>
            )}
          </div>
          <Typography className={classes.boardName} variant="h6">
            {boardName}
          </Typography>
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
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          {controls}
          {!controls && <div />}
          <Button
            onClick={handleLogOut}
            variant="outlined"
            color="default"
            classes={{ root: classes.navButton }}
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <ShareBoardModal />
    </>
  );
};

export default Header;
