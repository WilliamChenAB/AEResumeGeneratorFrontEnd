import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActionArea, CircularProgress, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';
import StyledTextField from './Styled';
import AlertPopup from '../AlertPopup';
import axios from 'axios';

export default function TextBox({ id, text, selectState, selectable, onSelect, rows, hideEdit, onDelete, header, footer }) {
  const [value, setValue] = useState(text);
  const [selected, setSelected] = useState(selectState);
  const [disabled, setDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editable, setEditable] = useState(!hideEdit);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);

  const textFieldRef = useRef();

  const handleClick = () => {
    setSelected(!selected);
    onSelect();
  }

  const handleEdit = () => {
    setIsSubmitting(true);
    setDisabled(true);
    setEditable(false);
    axios.put('/Sector/Edit', null, {
      params: {
        sectorId: id,
        content: textFieldRef.current.value,
      }
    }).then((response) => {
      setIsSubmitting(false);
      setEditable(true);
      setValue(textFieldRef.current.value);
      setOpenCompleteMessage({
        type: 'success',
        text: `Sector has been successfully edited.`
      });
    }).catch((error) => {
      setIsSubmitting(false);
      setEditable(true);
      textFieldRef.current.value = value;
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while editing sector. (${error.response.status} ${error.response.statusText})`
      });
    });
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={() => { setOpenCompleteMessage(false) }}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <Typography variant='subtitle2'>{header}</Typography>
        <Card sx={{ width: '100%' }}>
          {selectable ?
            <CardActionArea onClick={() => handleClick()}>
              <StyledTextField
                id='textfield'
                multiline
                rows={rows ? rows : 5}
                defaultValue={text}
                inputRef={textFieldRef}
                disabled={disabled}
                fullWidth
                selected={selected}
              />
            </CardActionArea> :
            <Box sx={{ position: 'relative', textAlign: 'center' }}>
              <TextField
                id='textfield'
                multiline
                rows={rows ? rows : 5}
                defaultValue={text}
                inputRef={textFieldRef}
                disabled={disabled}
                fullWidth
              />
              {isSubmitting &&
                <Box sx={{ position: 'absolute', top: '20px', left: '50%', marginLeft: '-70px' }}>
                  <CircularProgress size={24} />
                  <Typography variant='h3'>Editing Sector...</Typography>
                </Box>
              }
            </Box>
          }
        </Card>
        <Typography variant='body2'>{footer}</Typography>
      </Box>
      {editable &&
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            {disabled ? <IconButton onClick={() => setDisabled(!disabled)}><EditIcon /></IconButton> :
              <>
                <IconButton onClick={() => { handleEdit() }}>
                  <CheckIcon />
                </IconButton>
                <IconButton onClick={() => { setDisabled(true); textFieldRef.current.value = value }}>
                  <ClearIcon />
                </IconButton>
              </>
            }
          </Box>
          <Box>
            <IconButton onClick={() => { onDelete() }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      }
    </Box>
  )
}
