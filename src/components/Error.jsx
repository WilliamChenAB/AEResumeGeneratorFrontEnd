import { Alert, Box } from '@mui/material';

/**
 * Error alert and text.
 * @param text Text to display in alert 
 * @param response Optional error response
 * @returns Error component
 */
function Error({ text, response }) {
  return (
    <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Alert severity='error'>
        {text}
        {response && ` (${response.status} ${response.statusText})`}
      </Alert>
    </Box>
  );
}

export default Error;