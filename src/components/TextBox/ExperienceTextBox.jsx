import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Avatar, CardActionArea, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddExperience from '../../containers/AddExperience';
import { colorToken } from '../../theme/colorToken';
import CustomIconButton from '../../components/CustomIconButton';

const textStyle = {
  maxWidth: '100%',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export default function ExperienceTextBox({ sectorId, text, divisionIn, imageLinkIn, picture, selectState, selectable, onSelect, hideEdit, onDelete, header, footer, onEdit }) {
  const [dialogOpen, setOpenDialog] = useState(false);
  const [truncatable, setTruncateable] = useState(true);
  const [truncate, setTruncate] = useState(true);
  const [selected, setSelected] = useState(selectState);

  const descriptionRef = useRef();

  useEffect(() => {
    if (descriptionRef.current?.offsetHeight < descriptionRef.current?.scrollHeight) {
      setTruncateable(true);
    } else {
      setTruncateable(false);
    }
  }, [text]);

  const handleEdit = (newDivision, newImageLink, newDescription) => {
    onEdit(sectorId, newDivision, newImageLink, newDescription);
  }

  const handleClick = () => {
    setSelected(!selected);
    onSelect();
  }

  const onEditDialogClose = (success, newDivision, newImageLink, newDescription) => {
    setOpenDialog(false);
    if (success) {
      handleEdit(newDivision, newImageLink, newDescription);
    }
  }

  const drawContent = () => {
    return (
      <Box sx={{ margin: 2, height: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <Box my={1} sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between'}}>
            <Box>
              <Typography style={{whiteSpace: 'pre-line'}} ref={descriptionRef} sx={(truncatable && truncate) ? textStyle : { display: 'inline-block' }}>{text}</Typography>

            {truncatable && truncate && <Box mt={1}><Typography component='span' color='primary' sx={{ fontWeight: 'bold' }} onClick={(e) => { setTruncate(false); e.stopPropagation(); }}>Read More...</Typography></Box>}
            {truncatable && !truncate && <Box mt={1}><Typography component='span' color='primary' sx={{ fontWeight: 'bold' }} onClick={(e) => { setTruncate(true); e.stopPropagation(); }}>Read Less...</Typography></Box>}
            </Box>
            <br />
            {divisionIn && <Typography component='div' sx={{ fontWeight: 'bold' }}>{`Division: ${divisionIn}`}</Typography>}
          </Box>
          {imageLinkIn && <Box mx={3} my={2}><Avatar variant='rounded' alt={imageLinkIn} src={picture} sx={{ borderRadius: 4, width: 150, height: 150, textAlign: 'center', wordWrap: 'break-word' }}>{imageLinkIn}</Avatar></Box>}
        </Box>
      </Box>);
  }

  const backgroundColor = selected ? colorToken.brand.aeGreenLight : colorToken.greyPalette.lightGrey;
  const borderColor = selected ? 'green' : colorToken.greyPalette.lightGrey; 
  return (
    <Box sx={{ minHeight: 170, display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Typography variant='subtitle2'>{header}</Typography>
        <Card sx={{ height: '100%', width: '100%' }}>
          {selectable &&
            <CardActionArea sx={{ height: '100%', border: 2, borderColor: borderColor, background: backgroundColor }} onClick={() => { handleClick() }}>
              {drawContent()}
            </CardActionArea>
          }
          {!selectable &&
            <CardActionArea disabled={hideEdit} sx={{ height: '100%', border: 2, borderColor: colorToken.greyPalette.lightGrey }} onClick={() => { !hideEdit? setOpenDialog(true): setOpenDialog(false)}}>
              {drawContent()}
            </CardActionArea>
          }
        </Card>
        <Typography variant='body2'>{footer}</Typography>
      </Box>
      {!hideEdit &&
        <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <CustomIconButton tooltipText='Edit sector' onClick={() => { setOpenDialog(true) }}><EditIcon /></CustomIconButton>
          <CustomIconButton tooltipText='Delete sector' onClick={() => { onDelete() }}><DeleteIcon /></CustomIconButton>
        </Box>
      }
      <AddExperience startingImage={imageLinkIn} startingDiv={divisionIn} startingContent={text} open={dialogOpen} onClose={onEditDialogClose}></AddExperience>
    </Box>
  )
}
