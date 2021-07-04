import React from 'react';
import { Typography } from '@material-ui/core';

interface Props {
  error: string;
}

const Error: React.FC<Props> = ({ error }) => (
  <>
    <Typography color="error" align="center" variant="h4">
      Error!
    </Typography>
    <Typography align="center" variant="h6">
      {error}
    </Typography>
  </>
);

export default Error;
