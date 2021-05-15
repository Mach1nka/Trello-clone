import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
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
import { deleteColumn } from '../../store/column/actions';
import RenameColumnModal from './rename-column';

interface Props {
  columnName: string;
  columnsContainerId: string;
  columnId: string;
  boardId: string;
}

const Column: React.FC<Props> = ({ columnName, columnsContainerId, columnId, boardId }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpenModal, setModalView] = useState(false);
  const isOpenMenu = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDelete = () => {
    dispatch(deleteColumn({ columnsContainerId, columnId, boardId }));
    setAnchorEl(null);
  };

  const handleRename = () => {
    setModalView(true);
    setAnchorEl(null);
  };

  return (
    <>
      <Container>
        <Content>
          <ColumnHeader>
            <Typography display="block" variant="button">
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
      <RenameColumnModal
        columnsContainerId={columnsContainerId}
        isOpen={isOpenModal}
        columnId={columnId}
        setModalView={setModalView}
      />
    </>
  );
};

export default Column;
