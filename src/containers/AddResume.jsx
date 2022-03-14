import { useEffect, useState, useRef } from 'react';
import { Button, Grid, IconButton, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import Dropdown from '../components/Dropdown';
import AlertPopup from '../components/AlertPopup';

const defaultFormValues = {
  name: '',
  template: ''
};

/**
 * Add workspace pop-up.
 * @param open Boolean for if dialog is open
 * @param onClose Handler for when dialog should be closed
 * @returns AddWorkspace container
 */
function AddResume({ open, onClose }) {
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
    setSubmitDisabled(true);
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
    console.log('creating resume with values:');
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
      <AlertPopup type='success' open={openCompleteMessage} onClose={handleCloseCompleteMessage}>Resume {formValues.name} has been successfully added.</AlertPopup>
      <Dialog maxWidth='lg' fullWidth open={open}>
        <DialogTitle>
          Add Resume
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form ref={formRef}>
            <TextField fullWidth required label='Resume Name' variant='standard' name='name' onChange={handleFormChange}></TextField>
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

export default AddResume;