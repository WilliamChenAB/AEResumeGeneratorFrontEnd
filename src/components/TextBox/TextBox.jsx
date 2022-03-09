import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { CardActionArea } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteIcon from '@mui/icons-material/Delete';

import StyledTextField from './Styled';

// TODO: add prop for onSubmit -> save to BE, update actions

export default function TextBox({id, text, selectState, selectable, onSelect, rows, hideEdit}) {
  const [value, setValue] = React.useState(text);
  const [selected, setSelected] = React.useState(selectState);
  const [disabled, setDisabled] = React.useState(true);

  const handleClick = () => {
    setSelected(!selected);
    onSelect();
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      <Card sx={{ width: '100%' }}>
        {selectable ?
          <CardActionArea onClick={() => handleClick()}>
            <StyledTextField
              id="textfield"
              multiline
              rows={rows ? rows : 5}
              value={value}
              onChange={(event) => setValue(event.target.value)}
              disabled={disabled}
              fullWidth
              selected={selected}
            />
          </CardActionArea> :
          <TextField
            id="textfield"
            multiline
            rows={rows ? rows : 5}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={disabled}
            fullWidth
          />
        }
      </Card>
      {
        hideEdit ? null :
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {disabled ? <IconButton onClick={() => setDisabled(!disabled)}><EditIcon /></IconButton> :
                <><IconButton onClick={() => setDisabled(!disabled)}>
                  <CheckIcon />
                </IconButton>
                  <IconButton onClick={() => { setDisabled(!disabled); setValue(text) }}>
                    <ClearIcon />
                  </IconButton>
                </>
              }
            </Box>
            <Box>
              <IconButton onClick={() => { }}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
      }
    </Box>
  )
}
