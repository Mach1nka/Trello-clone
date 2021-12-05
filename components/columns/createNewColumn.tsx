import React, { useState, useCallback } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import { CreateColumnModal } from './modal/create';
import { ColumnSC as SC } from './sc';

interface Props {
  boardId: string;
}

export const CreateColumn: React.FC<Props> = ({ boardId }) => {
  const [isOpen, setModalView] = useState(false);

  const onClick = useCallback(() => setModalView(true), []);

  return (
    <>
      <SC.CreateColumnContainer>
        <Button
          onClick={onClick}
          fullWidth
          size="small"
          startIcon={<AddIcon />}
        >
          Create new column
        </Button>
      </SC.CreateColumnContainer>
      <CreateColumnModal
        setModalView={setModalView}
        isOpen={isOpen}
        boardId={boardId}
      />
    </>
  );
};
