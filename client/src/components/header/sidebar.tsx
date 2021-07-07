import React, { useState, useCallback } from 'react';
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

  const showSidebar = useCallback(() => setSidebarState(true), []);

  const hideSidebar = useCallback(() => setSidebarState(false), []);

  const shareHandler = useCallback(() => {
    handleShareButton();
    setSidebarState(false);
  }, []);

  const boardButtonHandler = useCallback(() => {
    handleBoardsButton();
    setSidebarState(false);
  }, []);

  return (
    <>
      <SC.BurgerButton aria-label="menu" onClick={showSidebar}>
        <MenuIcon />
      </SC.BurgerButton>
      <SC.Drawer onClose={hideSidebar} open={isOpenSidebar}>
        <SC.List>
          <ListItem divider>
            <SC.ListItemText primary={boardName} />
          </ListItem>
          {isOwnBoard !== -1 && (
            <ListItem button onClick={shareHandler}>
              <SC.ListItemText primary="Share" />
            </ListItem>
          )}
          <ListItem button onClick={boardButtonHandler}>
            <SC.ListItemText primary="Boards" />
          </ListItem>
        </SC.List>
      </SC.Drawer>
    </>
  );
};

export default Sidebar;
