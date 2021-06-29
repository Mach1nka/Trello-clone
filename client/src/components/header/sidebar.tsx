import React, { useState } from 'react';
import { ListItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { HeaderSC as SC } from './sc';

interface Props {
  boardName: string;
  handleBoardsButton: () => void;
  handleShareButton: () => void;
  isOwnBoard: number;
}

const Sidebar: React.FC<Props> = ({
  boardName,
  handleBoardsButton,
  handleShareButton,
  isOwnBoard
}) => {
  const [isOpenSidebar, setSidebarState] = useState(false);

  return (
    <>
      <SC.BurgerButton aria-label="menu" onClick={() => setSidebarState(true)}>
        <MenuIcon />
      </SC.BurgerButton>
      <SC.Drawer onClose={() => setSidebarState(false)} open={isOpenSidebar}>
        <SC.List>
          <ListItem divider>
            <SC.ListItemText primary={boardName} />
          </ListItem>
          {isOwnBoard !== -1 && (
            <ListItem
              button
              onClick={() => {
                handleShareButton();
                setSidebarState(false);
              }}
            >
              <SC.ListItemText primary="Share" />
            </ListItem>
          )}
          <ListItem
            button
            onClick={() => {
              handleBoardsButton();
              setSidebarState(false);
            }}
          >
            <SC.ListItemText primary="Boards" />
          </ListItem>
        </SC.List>
      </SC.Drawer>
    </>
  );
};

export default Sidebar;
