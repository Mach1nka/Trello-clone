import React from 'react';
import { ColumnsContainer as Container } from './sc';
import Column from './column';
import CreateColumn from './create-column-button';

const ColumnsContainer: React.FC = () => (
  <Container>
    <Column columnName="To do" />
    <CreateColumn />
  </Container>
);

export default ColumnsContainer;
