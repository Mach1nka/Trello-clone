import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { CardContainer as Container } from '../sc';
import { deleteCard } from '../../../store/card/actions';
import { setModalData, setModalsStates, resetModalData } from '../../../store/modals/actions';

interface Props {
  cardId: string;
  name: string;
  columnId: string;
  description: string;
}

const Card: React.FC<Props> = ({ cardId, name, columnId, description }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    dispatch(resetModalData());
    dispatch(deleteCard({ columnId, cardId }));
    setAnchorEl(null);
  };

  const handleChangeName = () => {
    dispatch(setModalData({ cardId, columnId, name, description }));
    dispatch(setModalsStates({ isRenameModalVisible: true }));
    setAnchorEl(null);
  };

  const handleChangePosition = () => {
    dispatch(setModalData({ cardId, columnId, name, description }));
    dispatch(setModalsStates({ isPositionModalVisible: true }));
    setAnchorEl(null);
  };

  const handleChangeStatus = () => {
    dispatch(setModalData({ cardId, columnId, name, description }));
    dispatch(setModalsStates({ isStatusModalVisible: true }));
    setAnchorEl(null);
  };

  return (
    <Container
      onClick={() => {
        dispatch(setModalData({ cardId, columnId, name, description }));
        dispatch(setModalsStates({ isDetailsModalVisible: true }));
      }}
    >
      <Typography style={{ width: '200px' }} variant="subtitle2">
        {name}
      </Typography>
      <IconButton
        aria-label="edit card"
        onClick={handleMenu}
        size="small"
        style={{ alignSelf: 'flex-start', fontSize: '15px' }}
      >
        <EditIcon style={{ fontSize: 'inherit' }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        keepMounted
        onClick={(e) => e.stopPropagation()}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleChangeName}>Rename</MenuItem>
        <MenuItem onClick={handleChangePosition}>Change position</MenuItem>
        <MenuItem onClick={handleChangeStatus}>Change column</MenuItem>
      </Menu>
    </Container>
  );
};

export default Card;
