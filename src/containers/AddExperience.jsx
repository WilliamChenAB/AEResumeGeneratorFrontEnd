import { useEffect, useState, useRef } from 'react';
import { Button, Grid, IconButton, Dialog, DialogTitle, DialogContent, TextField, Snackbar, Alert, Stack, Box} from '@mui/material';
import { Close } from '@mui/icons-material';
import Dropdown from '../components/Dropdown';

const defaultFormValues = {
  name: '',
  division: '',
  location: '',
  image: '',
  description: ''
};

/**
 * Add Experience Sector pop-up.
 * @param divisions array of divisions
 * @param locations array of locations
 * @param open Boolean for if dialog is open
 * @param onClose Handler for when dialog should be closed
 * @returns AddExperience container
 */
function AddExperience({ divisions, locations, open, onClose }) {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);

  const formRef = useRef();

  useEffect(() => {
    if (formRef.current?.checkValidity()) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [formValues]);

  const handleClose = (success) => {
    setSubmitDisabled(true);
    onClose(success, formValues.name, formValues.division, formValues.location, formValues.image, formValues.description);
  }

  const handleFormChange = (ev) => {
    setFormValues({
      ...formValues,
      [ev.target.name]: ev.target.value
    });
  }

  const handleDropdownChange = (ev) => {
    handleFormChange(ev);
  }

  const handleSubmit = (ev) => {
    console.log('creating Experience sector with values:');
    console.log(formValues);

    // TODO - display complete message based on submit success status
    setOpenCompleteMessage(true);
    handleClose(true);
  }

  const handleCloseCompleteMessage = (ev) => {
    setOpenCompleteMessage(false)
  }

  return (
    <div>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={openCompleteMessage} autoHideDuration={5000} onClose={handleCloseCompleteMessage}>
        <Alert severity='success' onClose={handleCloseCompleteMessage}>Experience Sector for project {formValues.name} has been successfully created.</Alert>
      </Snackbar>
      <Dialog maxWidth='lg' fullWidth open={open}>
        <DialogTitle>
          Add Experience Sector
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => {handleClose(false);}}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form ref={formRef}>
            <TextField fullWidth required label='Project Name' variant='standard' name='name' onChange={handleFormChange}></TextField>
            <br />
            <br />
            <TextField fullWidth label='Image Link' variant='standard' name='image' onChange={handleFormChange}></TextField>
            <br />
            <br />
            <Stack direction="row" spacing={2}>
              <Box sx={{flexGrow : 1}}>
                <Dropdown required label='Division' name='division' options={divisions} onChange={handleDropdownChange} />
              </Box>
              <Box sx={{flexGrow : 1}}>
                <Dropdown required label='Location' name='location' options={locations} onChange={handleDropdownChange} />
              </Box>
            </Stack>
            <br />
            <TextField required fullWidth multiline rows={4} label='Description' name='description' onChange={handleFormChange}></TextField>
            <br />
            <br />
            <Grid container justifyContent='flex-end'>
              <Button variant='contained' onClick={handleSubmit} disabled={submitDisabled}>Save</Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddExperience;