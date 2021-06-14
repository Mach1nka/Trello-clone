import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import useFetchUsers from '../../../utils/fetch-user-hook';
import { useStyles } from './constants';
import { signOutUser } from '../../store/auth/actions';
import { deleteBoardsData } from '../../store/board/actions';
import { deleteColumnsData } from '../../store/column/actions';
import { deleteCardsData } from '../../store/card/actions';

interface Location {
  state: {
    boardName: string;
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
  const isMainPage = pathname === '/boards';
  // const users = useFetchUsers();
  
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
            <Button onClick={() => {}} variant="outlined" color="default">
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
  );
};

export default Header;
