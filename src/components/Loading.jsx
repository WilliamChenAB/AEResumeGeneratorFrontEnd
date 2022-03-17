import { Box, CircularProgress, Stack, Typography } from '@mui/material';

/**
 * Loading icon and text.
 * @param text Text to display under loading spinner 
 * @returns Loading component
 */
function Loading({ text }) {
  return (
    <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <Stack sx={{ alignItems: 'center' }} spacing={2}>
        <CircularProgress />
        <Typography variant='h2'>{text}</Typography>
      </Stack>
    </Box>
  );
}

export default Loading;