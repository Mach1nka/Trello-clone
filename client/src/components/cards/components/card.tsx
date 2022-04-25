import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { deleteCard } from '../../../store/actions/card';
import { setCardDataForModal, setModalsStates, resetModalData } from '../../../store/actions/modal';
import { CardSC as SC } from '../sc';

interface Props {
  cardId: string;
  name: string;
  columnId: string;
  description: string;
  dragStyles: {
    cardId: string;
    backgroundColor: string;
  };
}

const Card: React.FC<Props> = ({ cardId, name, columnId, description, dragStyles }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }, []);

  const handleDelete = useCallback(() => {
    dispatch(resetModalData());
    dispatch(deleteCard({ columnId, cardId }));
    setAnchorEl(null);
  }, []);

  const handleChangeName = useCallback(() => {
    dispatch(setCardDataForModal({ cardId, columnId, name, description }));
    dispatch(setModalsStates({ isRenameModalVisible: true }));
    setAnchorEl(null);
  }, []);

  const handleChangePosition = useCallback(() => {
    dispatch(setCardDataForModal({ cardId, columnId, name, description }));
    dispatch(setModalsStates({ isPositionModalVisible: true }));
    setAnchorEl(null);
  }, []);

  const handleChangeStatus = useCallback(() => {
    dispatch(setCardDataForModal({ cardId, columnId, name, description }));
    dispatch(setModalsStates({ isStatusModalVisible: true }));
    setAnchorEl(null);
  }, []);

  const showDetailsModal = useCallback(() => {
    dispatch(setCardDataForModal({ cardId, columnId, name, description }));
    dispatch(setModalsStates({ isDetailsModalVisible: true }));
  }, []);

  const onCloseMenu = useCallback(() => setAnchorEl(null), []);

  return (
    <SC.Container
      dragStyles={dragStyles.cardId === cardId ? dragStyles.backgroundColor : null}
      onClick={showDetailsModal}
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
        onClose={onCloseMenu}
      >
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
        <MenuItem onClick={handleChangeName}>Rename</MenuItem>
        <MenuItem onClick={handleChangePosition}>Change position</MenuItem>
        <MenuItem onClick={handleChangeStatus}>Change column</MenuItem>
      </Menu>
    </SC.Container>
  );
};

export default Card;
