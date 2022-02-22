import { Avatar, Box, Typography } from '@mui/material';

function getInitials(text) {
  return text.split(' ').map(word => word[0]).join('').toUpperCase();
}

/**
 * Profile component with optional picture and title text.
 * Takes up full width of parent container.
 * @param title Title text
 * @param picture Optional picture object, circle diameter is width
 * @param width Optional width of component, default is 150px
 * @returns Profile component
 */
function Profile({ title, picture, width = 150 }) {
  // TODO - if we want the user to be able to change the picture, add an edit icon.
  // Since this requirement and UI isn't fully flushed out, this is to do.

  return (
    <Box sx={{ width: width }}>
      <Avatar alt={title} src={picture} sx={{ width: width, height: width, textAlign: 'center', wordWrap: 'break-word' }}>{getInitials(title)}</Avatar>
      <Typography variant='subtitle2' color='primary' align='center' component='div' sx={{ fontWeight: 'bold' }}>{title}</Typography>
    </Box>
  );
}

export default Profile;