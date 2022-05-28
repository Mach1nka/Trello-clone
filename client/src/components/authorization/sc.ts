import styled from 'styled-components';
import { Paper, Button } from '@material-ui/core';

import { MUOptions } from '../../types/sc';

const AuthorizationSC = {
  SignUpForm: styled.form`
    height: 100%;
    margin-top: 7%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  `,
  LogInForm: styled.form`
    height: 100%;
    margin-top: 7%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  `,

  Paper: styled(Paper)`
    width: inherit;
    height: 500px;
    margin-top: 30%;
  `,
  SubmitButton: styled(Button)`
    ${({ theme }: MUOptions) => `
      background-color: ${theme.palette.warning.main};
      &:hover {
        background-color: ${theme.palette.warning.main};
      }
    `}
  `
};

export { AuthorizationSC };
