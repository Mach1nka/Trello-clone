import React from 'react';
import { TextField, Button } from '@material-ui/core';

const formStyles: React.CSSProperties = {
  height: '100%',
  marginTop: '7%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between'
};

const SignUp = (): JSX.Element => (
  <form style={formStyles} autoComplete="off">
    <div>
      <TextField
        size="medium"
        margin="normal"
        variant="outlined"
        id="standard-basic"
        fullWidth
        required
        label="Login"
      />
      <TextField
        size="medium"
        margin="normal"
        variant="outlined"
        id="standard-password-input"
        required
        fullWidth
        label="Password"
        type="password"
      />
      <TextField
        size="medium"
        id="standard-confirm-password-input"
        required
        variant="outlined"
        fullWidth
        margin="normal"
        label="Confirm password"
        type="password"
      />
    </div>
    <Button size="large" fullWidth color="secondary" variant="contained">
      submit
    </Button>
  </form>
);

export default SignUp;
