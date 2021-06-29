import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import CreateColumnModal from './create-column';
import { ColumnSC as SC } from '../sc';

interface Props {
  boardId: string;
  newPosition: number;
}

const CreateColumn: React.FC<Props> = ({ boardId, newPosition }) => {
  const [isOpen, setModalView] = useState(false);

  return (
    <>
      <SC.CreateColumnContainer>
        <Button onClick={() => setModalView(true)} fullWidth size="small" startIcon={<AddIcon />}>
          Create new column
        </Button>
      </SC.CreateColumnContainer>
      <CreateColumnModal
        setModalView={setModalView}
        isOpen={isOpen}
        boardId={boardId}
        newPosition={newPosition}
      />
    </>
  );
};

export default CreateColumn;
