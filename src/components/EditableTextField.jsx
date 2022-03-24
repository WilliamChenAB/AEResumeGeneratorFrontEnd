import { useState, useEffect } from 'react';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClickAwayListener from '@mui/material/ClickAwayListener';


export default function EditableTextField({ templateText, setTemplateText, tabClicked }) {
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState(templateText);
  const handleChange = (e) => {
    setText(e.target.value);
  }

  const discardChange = () => {
    setText(templateText);
    setEdit(false);
  }

  const saveChange = () => {
    setTemplateText(text);
    setEdit(false);
  }


  useEffect(() => {
    setText(templateText);
    setEdit(false);
  }, [tabClicked, templateText])

  const isFieldEmpty = (fieldText) => {
    return fieldText.replace(/\s+/g, '') === ''
  }


  return (
    <Box key={templateText} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {edit ?
        <>
          <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={() => discardChange()}>
            <Box>
              <TextField
                defaultValue={text}
                error={isFieldEmpty(text) || text === null}
                helperText={isFieldEmpty(text) ? 'Field cannot be empty' : ''}
                variant="standard"
                onChange={(e) => handleChange(e)}
              />
              {text !== '' && <IconButton onClick={() => saveChange()}>
                <CheckIcon />
              </IconButton>
              }
            </Box>
          </ClickAwayListener>
        </> :
        <>
          <Typography variant='h3'>{text.toUpperCase()}</Typography>
          <IconButton onClick={() => setEdit(true)}>
            <EditIcon />
          </IconButton>
        </>
      }
    </Box>
  )
}