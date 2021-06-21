import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from './constants';

interface Props {
  boardName: string;
  handleBoardsButton: void;
  handleShareButton: void;
}

const Sidebar: React.FC<Props> = ({ boardName, handleBoardsButton, handleShareButton }) => {
  const classes = useStyles();
  const [isOpenSidebar, setSidebarState] = useState(false);
  return (
    <>
      <IconButton onClick={() => setSidebarState(true)} classes={{ root: classes.burgerButton }}>
        <MenuIcon />
      </IconButton>
      <Drawer
        classes={{ paper: classes.drawer }}
        onClose={() => setSidebarState(false)}
        open={isOpenSidebar}
      >
        <List>
          <ListItem divider>
            <ListItemText classes={{ primary: classes.listItemText }} primary={boardName} />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              handleShareButton();
              setSidebarState(false);
            }}
          >
            <ListItemText primary="Share" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              handleBoardsButton();
              setSidebarState(false);
            }}
          >
            <ListItemText primary="Boards" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
