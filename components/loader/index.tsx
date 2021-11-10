import { useContext } from 'react';
import { CircularProgress } from '@material-ui/core';

import { LoaderSC } from './sc';
import { LoaderContext } from 'context/LoaderContext';

export const Loader: React.FC = () => {
  const { loaderState } = useContext(LoaderContext);

  return (
    <LoaderSC open={loaderState}>
      <CircularProgress color="inherit" />
    </LoaderSC>
  );
};
