import { useState } from 'react';
import { Button, Box, CircularProgress, Grid, Typography } from '@mui/material';
import AELogo from '../assets/images/ae_logo_blue.png';
import HttpsIcon from '@mui/icons-material/Https';
import { useAuth } from 'react-oidc-context';

function LoginPage() {
  const auth = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    auth.signinRedirect();
  }

  return (
    <div>
      <Grid container direction='column' justifyContent='center' alignItems='center' sx={{ textAlign: 'center' }}>
        <Box>
          <img src={AELogo} alt='Associated Engineering' />
        </Box>
        <Box sx={{ border: '3px solid', borderColor: 'secondary.main', borderRadius: '10px', padding: '30px' }}>
          <Typography variant='h1' align='center' component='div'>Resume Generator</Typography>
          <br />
          <br />
          <Box sx={{ m: 1, position: 'relative' }}>
            <Button variant='contained' onClick={() => { handleLogin() }} startIcon={<HttpsIcon />} disabled={isLoading}>Login</Button>
            {isLoading &&
              <CircularProgress
                size={24}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            }
          </Box>
        </Box>
      </Grid>
    </div>
  )
}

export default LoginPage;