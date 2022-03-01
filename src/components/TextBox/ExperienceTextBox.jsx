import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Avatar, CardActionArea, Typography, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddExperience from '../../containers/AddExperience'; 

//temp test data
const locations = ["San Francisco", "Vancouver"];
const divisions = ["D1", "D2"];

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

export default function ExperienceTextBox(props) {
  const [name, setName] = React.useState(props.name);
  const [division, setDivision] = React.useState(props.division);
  const [location, setLocation] = React.useState(props.location);
  const [imageLink, setImageLink] = React.useState(props.imageLink);
  const [description, setDescription] = React.useState(props.description);
  const [picture, setPicture] = React.useState(props.picture);
  const [dialogOpen, setOpenDialog] = React.useState(false);
  const [truncateDescription, setTruncateDescription] = React.useState(true);


  const descriptionRef = React.useRef();

  React.useEffect(()=>{
    if(descriptionRef.current?.offsetHeight < descriptionRef.current?.scrollHeight){
      setTruncateDescription(true);
    }else {
      setTruncateDescription(false);
    }
  });

  const onClose = (success, newName, newDivision, newLocation, newImageLink, newDescription) => {
    setOpenDialog(false);
    console.log(success);
    if(success){
      setName(newName);
      setDivision(newDivision);
      setLocation(newLocation);
      setImageLink(newImageLink);
      setDescription(newDescription);
      setTruncateDescription(true);
    }
  }

  return (
    <Box sx={{display: 'flex', flexDirection: 'row' }}>
      <Card sx={{ width: '100%'}}>
        <CardActionArea>
          <Box sx={{margin: 2}}>
            <Box sx={{display: 'flex', flexDirection: 'row' }}>
              <Box sx={{display: 'flex', flexDirection: 'column', width: '100%'}}>
                {(name === undefined || location === undefined)? <Typography></Typography> : <Typography component='div' sx={{ fontWeight: 'bold' }}>{`${name}, ${location}`}</Typography>}
                <br />
                <Box>
                  <Typography ref={descriptionRef} sx={truncateDescription? textStyle : {display:'inline-block'}}>{description}</Typography>
                  {truncateDescription? <Typography component='span' color='primary' sx={{fontWeight: 'bold'}} onClick={() => {setTruncateDescription(false)}}>Read More</Typography>: null}
                </Box>
                <br />
                {(division === undefined || division === '')? <Typography></Typography> : <Typography component='div' sx={{ fontWeight: 'bold' }}>{`Division: ${division}`}</Typography>}
              </Box>
              <Avatar variant='rounded' alt={imageLink} src={picture} sx={{ borderRadius: 4, width: 150, height: 150, margin: 3 ,textAlign: 'center', wordWrap: 'break-word' }}>{imageLink}</Avatar>
            </Box>
          </Box>
        </CardActionArea>
      </Card>
      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
        <IconButton onClick={() => {setOpenDialog(true)}}><EditIcon/></IconButton>
        <Box>
          <IconButton onClick={() => {}}>
            <DeleteIcon/>
          </IconButton>
        </Box>
      </Box>
    <AddExperience divisions={divisions} locations={locations} open={dialogOpen} onClose={onClose}></AddExperience>
    </Box>
    
  )
}
