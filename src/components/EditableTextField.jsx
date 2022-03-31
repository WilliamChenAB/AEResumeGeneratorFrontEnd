import { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import CustomIconButton from './CustomIconButton';

export default function EditableTextField({ tooltipEditText, tooltipSaveText, templateText, setTemplateText, tabClicked }) {
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
    return fieldText.replace(/\s+/g, '') === '';
  }

  return (
    <Box key={templateText} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      {edit ?
        <>
          <ClickAwayListener mouseEvent='onMouseDown' touchEvent='onTouchStart' onClickAway={() => discardChange()}>
            <Box>
              <TextField
                defaultValue={text}
                error={isFieldEmpty(text) || text === null}
                helperText={isFieldEmpty(text) ? 'Field cannot be empty' : ''}
                variant='standard'
                onChange={(e) => handleChange(e)}
              />
              {text !== '' && <CustomIconButton tooltipText={tooltipSaveText} tooltipPlacement='right-end' onClick={() => saveChange()}>
                <CheckIcon />
              </CustomIconButton>
              }
            </Box>
          </ClickAwayListener>
        </> :
        <>
          <Typography variant='h3'>{text.toUpperCase()}</Typography>
          <CustomIconButton tooltipText={tooltipEditText} tooltipPlacement='right-end' onClick={() => setEdit(true)}>
            <EditIcon />
          </CustomIconButton>
        </>
      }
    </Box>
  )
}