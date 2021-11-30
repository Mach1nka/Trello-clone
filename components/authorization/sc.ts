import styled from 'styled-components';
import { Paper, Button, Theme } from '@material-ui/core';

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
    ${({ theme }: { theme: Theme }) => `
      background-color: rgba(240, 125, 57, 0.85) !important;
      &:hover {
        background-color: ${theme.palette.warning.main} !important;
      }
    `}
  `,
};

export { AuthorizationSC };
