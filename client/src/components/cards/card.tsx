import React, { useState } from 'react';
import { Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { CardContainer as Container } from './sc';

const Card: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenDescriptionModal, setDescriptionModalView] = useState(false);
  const [isOpenPositionModal, setPositionModalView] = useState(false);
  const [isOpenStatusModal, setStatusModalView] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    setAnchorEl(null);
  };

  const handleChangeDescription = () => {
    setDescriptionModalView(true);
    setAnchorEl(null);
  };

  const handleChangePosition = () => {
    setPositionModalView(true);
    setAnchorEl(null);
  };

  const handleChangeStatus = () => {
    setStatusModalView(true);
    setAnchorEl(null);
  };

  return (
    <Container>
      <Typography style={{ width: '200px' }} variant="subtitle2">
        [FE] Change order or columns by Drag&Drop
      </Typography>
      <IconButton size="small" style={{ alignSelf: 'flex-start', fontSize: '15px' }}>
        <EditIcon style={{ fontSize: 'inherit' }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} keepMounted onClose={handleMenu}>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleChangeDescription}>Rename</MenuItem>
        <MenuItem onClick={handleChangePosition}>Change position</MenuItem>
        <MenuItem onClick={handleChangeStatus}>Change column</MenuItem>
      </Menu>
    </Container>
  );
};

export default Card;
