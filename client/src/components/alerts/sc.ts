import styled from 'styled-components';
import { Alert } from '@material-ui/lab';
import { Theme } from '@material-ui/core';

const AlertSC = {
  Alert: styled(Alert)`
    margin-left: 30px;
    margin-top: 15px;
    max-width: 600px;
  `,
  AlertWrapper: styled.div`
    ${({ theme }: { theme: Theme }) => `
    position: fixed;
    display: flex;
    flex-direction: column;
    word-break: break-word;
    right: 40px;
    bottom: 40px;
  `}
  `
};

// z-index: ${theme.zIndex.drawer - 1};

export { AlertSC };
