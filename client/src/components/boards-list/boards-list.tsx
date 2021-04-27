import React from 'react';
import { Card, Typography, Paper } from '@material-ui/core';
import { useStyles } from './constants';
import { CardWrapper } from './sc';

const BoardsList: React.FC = () => {
  const classes = useStyles();
  return (
    <Card className={classes.cardContainer}>
      <Typography gutterBottom color="secondary" variant="h5" component="h5">
        My Boards
      </Typography>
      <CardWrapper>
        <Paper variant="outlined">hghfghfghfh</Paper>
      </CardWrapper>
    </Card>
  );
};

export default BoardsList;
