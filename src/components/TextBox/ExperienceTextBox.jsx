import { useState, useRef, useEffect} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Avatar, CircularProgress, CardActionArea, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddExperience from '../../containers/AddExperience'; 
import AlertPopup from '../AlertPopup';
import { colorToken  } from '../../theme/colorToken';
import axios from 'axios';

const textStyle = {
  maxWidth: '100%',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};


// TODO: add prop for onSubmit -> save to BE, update actions
//       also add update for picture possibly

export default function ExperienceTextBox({sectorId, text, divisionIn, imageLinkIn, picture, selectState, selectable, onSelect, hideEdit, onDelete, header, footer}) {
  const [dialogOpen, setOpenDialog] = useState(false);
  const [truncatable, setTruncateable] = useState(true);
  const [truncate, setTruncate] = useState(true);
  const [selected, setSelected] = useState(selectState);
  const [disabled, setDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editable, setEditable] = useState(!hideEdit);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [division, setDivision] = useState(divisionIn);
  const [content, setContent] = useState(text);
  const [imageLink, setImageLink] = useState(imageLinkIn);


  const descriptionRef = useRef();

  useEffect(()=>{
    if(descriptionRef.current?.offsetHeight < descriptionRef.current?.scrollHeight){
      setTruncateable(true);
    }else {
      setTruncateable(false);
    }
  }, [content]);

  const handleEdit = (newDivision, newImageLink, newDescription) => {
    console.log([newDivision, newImageLink, newDescription])
    setIsSubmitting(true);
    setDisabled(true);
    setEditable(false);
    axios.put('/Sector/Edit', null, {
      params: {
        sectorId: sectorId,
        content: newDescription,
        division: newDivision? newDivision: '',
        image: newImageLink? newImageLink: '',
      }
    }).then((response) => {
      setIsSubmitting(false);
      setEditable(true);
      setContent(newDescription);
      setDivision(newDivision);
      setImageLink(newImageLink);
      setOpenCompleteMessage({
        type: 'success',
        text: `Sector has been successfully edited.`
      });
    }).catch((error) => {
      setIsSubmitting(false);
      setEditable(true);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while editing sector. (${error.response.status} ${error.response.statusText})`
      });
    });
  }

  const handleClick = () => {
    setSelected(!selected);
    onSelect();
  }

  const onClose = (success, newDivision, newImageLink, newDescription) => {
    setOpenDialog(false);
    if(success){
      handleEdit(newDivision, newImageLink, newDescription);
    }
  }

  const drawContent = () => {
    return(
      <Box sx={{margin: 2, height: '100%'}}>
        <Box sx={{display: 'flex', flexDirection: 'row' }}>
          <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <Box>
              <Typography ref={descriptionRef} sx={(truncatable && truncate)? textStyle : {display:'inline-block'}}>{content}</Typography>
              {truncatable && truncate && <Typography component='span' color='primary' sx={{fontWeight: 'bold'}} onClick={() => {setTruncate(false)}}>Read More...</Typography>}
              {truncatable && !truncate && <Typography component='span' color='primary' sx={{fontWeight: 'bold'}} onClick={() => {setTruncate(true)}}>Read Less...</Typography>}
            </Box>
            <br />
            {!(division === null || division === undefined || division === '') && <Typography component='div' sx={{ fontWeight: 'bold' }}>{`Division: ${division}`}</Typography>}
          </Box>
          {imageLink && imageLink !== '' && <Avatar variant='rounded' alt={imageLink} src={picture} sx={{ borderRadius: 4, width: 150, height: 150, margin: 3 ,textAlign: 'center', wordWrap: 'break-word' }}>{imageLink}</Avatar>}
        </Box>
      </Box>);
  }

  const backgroundColor = selected? colorToken.brand.aeGreenLight : colorToken.greyPalette.lightGrey;
  const borderColor = selected? 'green' : colorToken.greyPalette.lightGrey;
  return (
    <Box sx={{minHeight: 170, display: 'flex', flexDirection: 'row'}}>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={() => { setOpenCompleteMessage(false) }}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
        <Typography variant='subtitle2'>{header}</Typography>
        <Card sx={{ height: '100%', width: '100%'}}>
          {selectable &&
          <CardActionArea sx={{ height: '100%', border:2, borderColor: borderColor, background: backgroundColor}} onClick={() => {handleClick()}}>
            {drawContent()}
          </CardActionArea>}
          {!selectable &&
          <CardActionArea sx={{height: '100%', border:2, borderColor: colorToken.greyPalette.lightGrey}}>
            {isSubmitting &&
              <Box sx={{ position: 'absolute', top: '20px', left: '50%', marginLeft: '-70px' }}>
                <CircularProgress size={24} />
                <Typography variant='h3'>Editing Sector...</Typography>
              </Box>
            }
            {!isSubmitting && drawContent()}
          </CardActionArea>}
        </Card>
        <Typography variant='body2'>{footer}</Typography>
      </Box>
      {
        editable &&
        <Box sx={{mb: 3, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
          <IconButton onClick={() => {setOpenDialog(true)}}><EditIcon/></IconButton>
          <Box>
            <IconButton onClick={() => {onDelete()}}>
              <DeleteIcon/>
            </IconButton>
          </Box>
        </Box>
      }
    <AddExperience startingImage={imageLink} startingDiv={division} startingContent={content} open={dialogOpen} onClose={onClose}></AddExperience>
    </Box>
    
  )
}
