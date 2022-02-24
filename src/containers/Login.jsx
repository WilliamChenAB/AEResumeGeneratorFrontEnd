import { useState } from 'react';
import { Button, Box, Grid, IconButton, InputAdornment, OutlinedInput, Typography } from '@mui/material';
import AELogo from '../assets/images/ae_logo_blue.png';
import { Person, Key, Visibility, VisibilityOff } from '@mui/icons-material';

/**
 * Login form.
 * @returns Login container
 */
function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = (ev) => {
    setShowPassword(!showPassword);
  }

  const handleLogin = (ev) => {
    console.log('logging in...');
  }

  return (
    <div>
      <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ textAlign: 'center'}}>
        <Box>
          <img src={AELogo} alt='Associated Engineering' />
        </Box>
        <Box sx={{ border: '3px solid', borderColor: 'secondary.main', borderRadius: '10px', padding: '30px' }}>
          <Typography variant='h1' align='center' component='div'>Resume Generator</Typography>
          <br />
          <OutlinedInput
            fullWidth
            placeholder='Username'
            variant='outlined'
            startAdornment={
              <InputAdornment position='start'>
                <Person />
              </InputAdornment>
            }
          />
          <br />
          <br />
          <OutlinedInput
            fullWidth
            placeholder='Password'
            type={showPassword ? 'text' : 'password'}
            startAdornment={
              <InputAdornment position='start'>
                <Key />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position='end'>
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <br />
          <br />
          <Button variant='contained' onClick={handleLogin}>Login</Button>
        </Box>
      </Grid>
    </div>
  );
}

export default Login;