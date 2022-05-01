import styled from 'styled-components';
import { Backdrop, Theme } from '@material-ui/core';

const LoaderSC = styled(Backdrop)`
  ${({ theme }: { theme: Theme }) => `
      z-index: ${theme.zIndex.drawer + 1} !important;
      color: #fff;
      background-color: rgba(0, 0, 0, 0.2);
    `}
`;
export { LoaderSC };
