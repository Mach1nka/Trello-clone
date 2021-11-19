import React, {
  useState,
  useCallback,
  Dispatch,
  SetStateAction,
  useContext,
} from 'react';
import { Menu, MenuItem, IconButton, Button } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';

import {
  AlertActions,
  AlertContext,
  AlertStatusData,
} from 'context/AlertContext';
import { ColumnContext } from 'context/ColumnContext';
import { ColumnActions } from 'services/resources/model/column.model';
import { RenameColumnModal } from './renameModal';
import { ChangeColumnPosition } from './changePosition';
// import CardsContainer from '../../cards/cards-container';
// import CreateCardModal from '../../cards/components/create-card-modal';
import { deleteColumn } from 'services/resources/request/column';
import { ColumnSC as SC } from './sc';
import { ErrorInfo } from 'services/HttpService/types';

interface Props {
  columnName: string;
  columnId: string;
  position: number;
  boardId: string;
  //   draggableCard: null | CardType;
  //   setDraggableCard: Dispatch<SetStateAction<CardType | null>>;
  //   dragStyles: {
  //     columnId: string;
  //     backgroundColor: string;
  //   };
}

export const Column: React.FC<Props> = ({
  columnName,
  columnId,
  boardId,
  position,
}) => {
  const { dispatch: columnDispatch } = useContext(ColumnContext);
  const { dispatch: alertDispatch } = useContext(AlertContext);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenRenameModal, setRenameModalView] = useState(false);
  const [isOpenCreateCardModal, setCreateCardModalView] = useState(false);
  const [isOpenPositionModal, setPositionModalView] = useState(false);
  const isOpenMenu = Boolean(anchorEl);

  const handleMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleDelete = useCallback(() => {
    deleteColumn({ columnId, boardId })
      .then((resp) =>
        columnDispatch({ type: ColumnActions.PUT_COLUMNS, payload: resp.data })
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

  const handleRename = useCallback(() => {
    setRenameModalView(true);
    setAnchorEl(null);
  }, []);

  const handleChangePosition = useCallback(() => {
    setPositionModalView(true);
    setAnchorEl(null);
  }, []);

  const onClose = useCallback(() => setAnchorEl(null), []);
  const showCreateModal = useCallback(() => setCreateCardModalView(true), []);

  return (
    <>
      <SC.Container dragStyles={null}>
        <SC.Content>
          <SC.Header>
            <SC.Name variant="h6">{columnName}</SC.Name>
            <IconButton
              size="small"
              aria-label="column settings"
              onClick={handleMenu}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isOpenMenu}
              keepMounted
              onClose={onClose}
            >
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
              <MenuItem onClick={handleRename}>Rename</MenuItem>
              <MenuItem onClick={handleChangePosition}>
                Change position
              </MenuItem>
            </Menu>
          </SC.Header>
          {/* <CardsContainer
            columnId={columnId}
            draggableCard={draggableCard}
            setDraggableCard={setDraggableCard}
          /> */}
          <SC.Footer>
            <Button
              onClick={showCreateModal}
              fullWidth
              size="small"
              startIcon={<AddIcon />}
            >
              Create new card
            </Button>
          </SC.Footer>
        </SC.Content>
      </SC.Container>
      <RenameColumnModal
        isOpen={isOpenRenameModal}
        columnId={columnId}
        setModalView={setRenameModalView}
        columnName={columnName}
      />
      <ChangeColumnPosition
        position={position}
        boardId={boardId}
        isOpen={isOpenPositionModal}
        columnId={columnId}
        setModalView={setPositionModalView}
      />
      {/* <CreateCardModal
        isOpen={isOpenCreateCardModal}
        columnId={columnId}
        setModalView={setCreateCardModalView}
      /> */}
    </>
  );
};
