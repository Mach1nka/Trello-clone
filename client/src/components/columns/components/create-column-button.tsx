import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { CreateColumnContainer as Container } from '../sc';
import CreateColumnModal from './create-column';

interface Props {
  boardId: string;
  newPosition: number;
}

const CreateColumn: React.FC<Props> = ({ boardId, newPosition }) => {
  const [isOpen, setModalView] = useState(false);

  return (
    <>
      <Container>
        <Button onClick={() => setModalView(true)} fullWidth size="small" startIcon={<AddIcon />}>
          Create new column
        </Button>
      </Container>
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
