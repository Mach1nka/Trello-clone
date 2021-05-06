import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core';
import { useStyles } from './constants';
import { signOutUser } from '../../store/auth/actions';

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

  const boardName = pathname.slice(0, 14) === '/boards/board/' ? state.boardName : '';

  const handleSignOut = () => {
    dispatch(signOutUser());
    history.push('/auth');
  };

  const handleButton = () => {
    history.push('/boards');
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <Button onClick={handleButton} variant="outlined" color="default">
          Boards
        </Button>
        <Typography color="textPrimary" variant="h6">
          {boardName}
        </Typography>
        <Button variant="outlined" color="default" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
