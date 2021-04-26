import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppBar, Toolbar, Button, IconButton, Menu, MenuItem } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { useStyles } from './constants';
import { signOutUser } from '../../store/auth/actions';

const Header: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSignOut = () => {
    setAnchorEl(null);
    dispatch(signOutUser());
  };

  const handleButton = () => {
    history.push('/boards');
  };

  return (
    <div>
      <AppBar className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Button onClick={handleButton} variant="outlined" color="default">
            Boards
          </Button>
          <div>
            <IconButton className={classes.iconButt} onClick={handleMenu}>
              <AccountCircle />
            </IconButton>
            <Menu anchorEl={anchorEl} keepMounted open={open} onClose={() => setAnchorEl(null)}>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
export default Header;
