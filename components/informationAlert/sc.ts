import styled from 'styled-components';
import { Alert } from '@material-ui/lab';

const AlertSC = {
    Alert: styled(Alert)`
        margin-left: 30px;
        max-width: 600px;
    `,
    AlertWrapper: styled.div`
        position: fixed;
        display: flex;
        flex-direction: column;
        word-break: break-word;
        right: 40px;
        bottom: 40px;
        z-index: 10000;
    `,
  };
  
  export { AlertSC };