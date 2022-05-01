import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';

import { LoaderSC } from './sc';
import { selectMaintainData } from '../../store/selectors';

const GlobalLoader: React.FC = () => {
  const { loading } = useSelector(selectMaintainData);

  return (
    <LoaderSC open={loading}>
      <CircularProgress color="inherit" />
    </LoaderSC>
  );
};

export default GlobalLoader;
