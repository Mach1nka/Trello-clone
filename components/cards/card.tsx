import { useState, useCallback, useContext } from 'react';
import { Typography, IconButton, Menu, MenuItem } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { ModalActions, ModalContext } from 'context/ModalContext';
import { CardContext } from 'context/CardContext';
import {
  AlertActions,
  AlertContext,
  AlertStatusData,
} from 'context/AlertContext';
import { deleteCard } from 'services/resources/request/card';
import { CardSC as SC } from './sc';
import { CardActions } from 'services/resources/model/card.model';
import { ErrorInfo } from 'services/HttpService/types';
import { RenameCardModal } from './modal/rename';
import { ChangeCardPosition } from './modal/changePosition';
import { ChangeCardStatus } from './modal/changeStatus';

interface Props {
  cardId: string;
  name: string;
  columnId: string;
  cardPosition: number;
  description: string;
}

export const CardItem: React.FC<Props> = ({
  cardId,
  name,
  columnId,
  cardPosition,
  description,
}) => {
  const { dispatch: modalDispatch } = useContext(ModalContext);
  const { dispatch: cardDispatch } = useContext(CardContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenRenameModal, setRenameModalView] = useState(false);
  const [isOpenPositionModal, setPositionModalView] = useState(false);
  const [isOpenStatusModal, setStatusModalView] = useState(false);

  const handleMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  }, []);

  const handleDelete = useCallback(() => {
    deleteCard({ columnId, cardId })
      .then((resp) =>
        cardDispatch({ type: CardActions.PUT_CARDS, payload: resp.data })
      )
      .catch((err: ErrorInfo) =>
        alertDispatch({
          type: AlertActions.ADD,
          payload: {
            id: `${Date.now()}`,
            message: err.message,
            status: AlertStatusData.ERROR,
          },
        })
      )
      .finally(() => setAnchorEl(null));
  }, []);

  const handleChangeName = useCallback(() => {
    setRenameModalView(true);
    setAnchorEl(null);
  }, []);

  const handleChangePosition = useCallback(() => {
    setPositionModalView(true);
    setAnchorEl(null);
  }, []);

  const handleChangeStatus = useCallback(() => {
    setStatusModalView(true);
    setAnchorEl(null);
  }, []);

  const showDetailsModal = useCallback(() => {
    modalDispatch({
      type: ModalActions.PUT_DETAILS,
      payload: {
        cardId,
        cardName: name,
        columnId,
        cardDescription: description,
      },
    });
    modalDispatch({ type: ModalActions.UPDATE_DISPLAY, payload: true });
    setAnchorEl(null);
  }, []);

  const onCloseMenu = useCallback(() => setAnchorEl(null), []);

  return (
    <>
      <SC.Container onClick={showDetailsModal}>
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
      <RenameCardModal
        isOpen={isOpenRenameModal}
        setModalView={setRenameModalView}
        cardId={cardId}
        cardName={name}
      />
      <ChangeCardPosition
        isOpen={isOpenPositionModal}
        setModalView={setPositionModalView}
        cardPosition={cardPosition}
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
