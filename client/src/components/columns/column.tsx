import React, { useState } from 'react';
import { Typography, Menu, MenuItem, IconButton, Button } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';
import {
  ColumnContainer as Container,
  ColumnHeader,
  ColumnContent as Content,
  ColumnFooter,
  CardContainer
} from './sc';

interface Props {
  columnName: string;
}

const Column: React.FC<Props> = ({ columnName }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container>
      <Content>
        <ColumnHeader>
          <Typography display="block" variant="button">
            {columnName}
          </Typography>
          <IconButton size="small" onClick={handleMenu}>
            <MoreHorizIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} keepMounted onClose={() => setAnchorEl(null)}>
            <MenuItem onClick={handleClose}>Delete</MenuItem>
            <MenuItem onClick={handleClose}>Rename</MenuItem>
          </Menu>
        </ColumnHeader>
        <CardContainer />
        <ColumnFooter>
          <Button fullWidth size="small" startIcon={<AddIcon />}>
            Create new card
          </Button>
        </ColumnFooter>
      </Content>
    </Container>
  );
};

export default Column;
