import { useEffect, useState, useRef } from 'react';
import { Button, Grid, IconButton, Dialog, DialogTitle, DialogContent, TextField, Snackbar, Alert } from '@mui/material';
import { Close } from '@mui/icons-material';
import Dropdown from '../components/Dropdown';

const defaultFormValues = {
  name: '',
  number: '',
  division: '',
  image: '',
  template: '',
};

/**
 * Add workspace pop-up.
 * @param open Boolean for if dialog is open
 * @param onClose Handler for when dialog should be closed
 * @returns AddWorkspace container
 */
function AddWorkspace({ open, onClose }) {
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

  const handleClose = (ev) => {
    onClose();
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
    console.log('creating workspace with values:');
    console.log(formValues);

    // TODO - display complete message based on submit success status
    
    setOpenCompleteMessage(true);
    handleClose();
  }

  const handleCloseCompleteMessage = (ev) => {
    setOpenCompleteMessage(false)
  }

  return (
    <div>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={openCompleteMessage} autoHideDuration={5000} onClose={handleCloseCompleteMessage}>
        <Alert severity='success' onClose={handleCloseCompleteMessage}>Workspace {formValues.name} has been successfully added.</Alert>
      </Snackbar>
      <Dialog maxWidth='lg' fullWidth open={open}>
        <DialogTitle>
          Add Workspace
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form ref={formRef}>
            <TextField fullWidth required label='Project Name' variant='standard' name='name' onChange={handleFormChange}></TextField>
            <br />
            <br />
            <TextField fullWidth required label='Project Number' variant='standard' name='number' onChange={handleFormChange}></TextField>
            <br />
            <br />
            <TextField fullWidth required label='Division' variant='standard' name='division' onChange={handleFormChange}></TextField>
            <br />
            <br />
            <TextField fullWidth label='Image Link' variant='standard' name='image' onChange={handleFormChange}></TextField>
            <br />
            <br />
            <Dropdown required label='Resume Template' options={['template1', 'template2', 'template3', 'template4', 'template5']} name='template' onChange={handleDropdownChange}></Dropdown>
            <br />
            <br />
            <Grid container justifyContent='flex-end'>
              <Button variant='contained' onClick={handleSubmit} disabled={submitDisabled}>Create</Button>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddWorkspace;