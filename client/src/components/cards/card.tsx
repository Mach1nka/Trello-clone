import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import { CardContainer as Container } from './sc';
import { deleteCard } from '../../store/card/actions';
import RenameCardModal from './rename-card';
import ChangeCardPosition from './change-card-position';
import ChangeCardStatus from './change-card-status';
import CardDetails from './card-details';

interface Props {
  cardId: string;
  description: string;
  name: string;
  position: number;
  columnId: string;
}

const Card: React.FC<Props> = ({ cardId, description, name, position, columnId }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenDescriptionModal, setDescriptionModalView] = useState(false);
  const [isOpenRenameModal, setRenameModalView] = useState(false);
  const [isOpenPositionModal, setPositionModalView] = useState(false);
  const [isOpenStatusModal, setStatusModalView] = useState(false);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    dispatch(deleteCard({ columnId, cardId }));
    setAnchorEl(null);
  };

  const handleChangeName = () => {
    setRenameModalView(true);
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
    <>
      <Container onClick={() => setDescriptionModalView(true)}>
        <Typography style={{ width: '200px' }} variant="subtitle2">
          {name}
        </Typography>
        <IconButton
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
      <CardDetails
        isOpen={isOpenDescriptionModal}
        setModalView={setDescriptionModalView}
        name={name}
        description={description}
        cardId={cardId}
      />
      <RenameCardModal
        isOpen={isOpenRenameModal}
        setModalView={setRenameModalView}
        cardName={name}
        cardId={cardId}
      />
      <ChangeCardPosition
        isOpen={isOpenPositionModal}
        setModalView={setPositionModalView}
        position={position}
        cardId={cardId}
        columnId={columnId}
      />
      <ChangeCardStatus
        isOpen={isOpenStatusModal}
        setModalView={setStatusModalView}
        cardId={cardId}
        columnId={columnId}
      />
    </>
  );
};

export default Card;
