import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { useStyles } from './constants';
import { signOutUser } from '../../store/auth/actions';

const Header: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

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
        <Button variant="outlined" color="default" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
