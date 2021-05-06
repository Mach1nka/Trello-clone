import React from 'react';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { CreateColumnContainer as Container } from './sc';

const CreateColumn: React.FC = () => (
  <Container>
    <Button fullWidth size="small" startIcon={<AddIcon />}>
      Create new column
    </Button>
  </Container>
);

export default CreateColumn;
