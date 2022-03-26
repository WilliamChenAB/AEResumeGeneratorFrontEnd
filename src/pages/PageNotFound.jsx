import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }} className='content-section-margins'>
      <Typography variant='h1'>Did you take the wrong exit?</Typography>
      <Typography variant='subtitle1'>The page you're looking for isn't here.</Typography>
      <Typography variant='body1'>
        Either the link you entered is incorrect or you do not have permission to view this page.
      </Typography>
      <Typography variant='body2'>
        If you think this is a mistake, please contact your system administrator.
      </Typography>
      <br />
      <Link to='/'>Click here to return back home</Link>
    </Box>
  );
}