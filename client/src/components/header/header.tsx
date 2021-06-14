import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { useStyles } from './constants';
import { signOutUser } from '../../store/auth/actions';
import { deleteBoardsData } from '../../store/board/actions';
import { deleteColumnsData } from '../../store/column/actions';
import { deleteCardsData } from '../../store/card/actions';
import ShareBoardModal from '../boards-page/share-board';

interface Location {
  state: {
    boardName: string;
    boardId: string;
  };
  pathname: string;
}

const Header: React.FC = () => {
  const { pathname, state }: Location = useLocation();
  const [isOpenModal, setModalView] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const pathLength = 14;
  const boardName = pathname.slice(0, pathLength) === '/boards/board/' ? state.boardName : '';
  const boardId = pathname.slice(0, pathLength) === '/boards/board/' ? state.boardId : '';
  const isMainPage = pathname === '/boards';

  const handleLogOut = () => {
    dispatch(signOutUser());
    dispatch(deleteBoardsData());
    dispatch(deleteColumnsData());
    dispatch(deleteCardsData());
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
                color="default"
              >
                Boards
              </Button>
              <Button onClick={() => setModalView(true)} variant="outlined" color="default">
                Share
              </Button>
            </div>
          ) : null}
          <Typography color="textPrimary" variant="h6">
            {boardName}
          </Typography>
          <Button variant="outlined" color="default" onClick={handleLogOut}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <ShareBoardModal isOpen={isOpenModal} setModalView={setModalView} boardId={boardId} />
    </>
  );
};

export default Header;
