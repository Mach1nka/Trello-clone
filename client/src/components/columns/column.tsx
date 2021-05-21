import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Menu, MenuItem, IconButton, Button } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import AddIcon from '@material-ui/icons/Add';
import {
  ColumnContainer as Container,
  ColumnHeader,
  ColumnContent as Content,
  ColumnFooter
} from './sc';
import { useStyles } from './constants';
import { deleteColumn } from '../../store/column/actions';
import CardsContainer from '../cards/cards-container';
import RenameColumnModal from './rename-column';
import ChangeColumnPosition from './change-column-position';

interface Props {
  columnName: string;
  columnId: string;
  position: number;
  boardId: string;
}

const Column: React.FC<Props> = ({ columnName, columnId, boardId, position }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenRenameModal, setRenameModalView] = useState(false);
  const [isOpenPositionModal, setPositionModalView] = useState(false);
  const classes = useStyles();
  const isOpenMenu = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    dispatch(deleteColumn({ columnId, boardId }));
    setAnchorEl(null);
  };

  const handleRename = () => {
    setRenameModalView(true);
    setAnchorEl(null);
  };

  const handleChangePosition = () => {
    setPositionModalView(true);
    setAnchorEl(null);
  };

  return (
    <>
      <Container>
        <Content>
          <ColumnHeader>
            <Typography className={classes.columnName} display="block" variant="h6">
              {columnName}
            </Typography>
            <IconButton size="small" onClick={handleMenu}>
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={isOpenMenu}
              keepMounted
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleDelete}>Delete</MenuItem>
              <MenuItem onClick={handleRename}>Rename</MenuItem>
              <MenuItem onClick={handleChangePosition}>Change position</MenuItem>
            </Menu>
          </ColumnHeader>
          <CardsContainer />
          <ColumnFooter>
            <Button fullWidth size="small" startIcon={<AddIcon />}>
              Create new card
            </Button>
          </ColumnFooter>
        </Content>
      </Container>
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
    </>
  );
};

export default Column;
