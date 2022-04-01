import { Avatar, Box, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CustomIconButton from './CustomIconButton';

function getInitials(text) {
  return text ? text.split(' ').map(word => word[0]).join('').toUpperCase() : null;
}

/**
 * Profile component with optional picture and title text.
 * Takes up full width of parent container.
 * @param title Title text
 * @param subtitle Subtitle text
 * @param picture Optional picture object, circle diameter is width
 * @param width Optional width of component, default is 150px
 * @param showEdit Whether or not to show edit icon
 * @param onEdit Handler for when edit icon is clicked
 * @returns Profile component
 */
function Profile({ title, subtitle, picture, width = 150, showEdit, onEdit }) {
  return (
    <Box sx={{ position: 'relative', width: width }}>
      {showEdit &&
        <Box sx={{ position: 'absolute', right: '-35px', bottom: '0px' }}>
          <CustomIconButton tooltipText='Edit employee details' onClick={onEdit}>
            <EditIcon />
          </CustomIconButton>
        </Box>
      }
      <Box mb={1}>
        <Avatar alt={title} src={picture} sx={{ width: width, height: width, textAlign: 'center', wordWrap: 'break-word' }}>{getInitials(title)}</Avatar>
      </Box>
      <Typography variant='subtitle2' color='primary' align='center' component='div' sx={{ fontWeight: 'bold' }}>{title}</Typography>
      <Typography variant='body1' color='primary' align='center'>{subtitle}</Typography>
    </Box>
  );
}

export default Profile;