import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { useStyles } from './constants';
import { signOutUser } from '../../store/auth/actions';
import { setModalsStates, setModalData } from '../../store/modals/actions';
import ShareBoardModal from '../boards-page/components/share-board';
import { removeAuthDataFromLocalStorage } from '../../../utils/auth-data-localstorage';

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
  const pathLength = 14;
  const boardName = pathname.slice(0, pathLength) === '/boards/board/' ? state.boardName : '';
  const boardId = pathname.slice(0, pathLength) === '/boards/board/' ? state.boardId : '';
  const isMainPage = pathname === '/boards';

  const handleLogOut = () => {
    dispatch(signOutUser());
    removeAuthDataFromLocalStorage();
    history.push('/auth');
  };

  const handleButton = () => {
    history.push('/boards');
  };

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          {!isMainPage ? (
            <div>
              <Button
                style={{ marginRight: '10px' }}
                onClick={handleButton}
                variant="outlined"
                classes={{ root: classes.navButton }}
              >
                Boards
              </Button>
              <Button
                onClick={() => {
                  dispatch(setModalData({ boardId }));
                  dispatch(setModalsStates({ isShareModalVisible: true }));
                }}
                variant="outlined"
                classes={{ root: classes.navButton }}
              >
                Share
              </Button>
            </div>
          ) : null}
          <Typography className={classes.boardName} variant="h6">
            {boardName}
          </Typography>
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
