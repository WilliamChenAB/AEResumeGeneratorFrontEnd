import { useEffect, useState, useRef } from 'react';
import { Button, Grid, IconButton, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import Dropdown from '../components/Dropdown';
import AlertPopup from '../components/AlertPopup';

const defaultFormValues = {
  name: '',
  baseTemplate: '',
  description: ''
};

/**
 * Add Template pop-up.
 * @param templates array of templates
 * @param open Boolean for if dialog is open
 * @param onClose Handler for when dialog should be closed
 * @returns AddTemplate container
 */
function AddTemplate({ templates, open, onClose }) {
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
    console.log('creating template with values:');
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
      <AlertPopup type='success' open={openCompleteMessage} onClose={handleCloseCompleteMessage}>Template {formValues.name} has been successfully created.</AlertPopup>
      <Dialog maxWidth='lg' fullWidth open={open}>
        <DialogTitle>
          Create Template
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form ref={formRef}>
            <TextField fullWidth required label='Template Name' variant='standard' name='name' onChange={handleFormChange}></TextField>
            <br />
            <br />
            <Dropdown label='Base Template' name='baseTemplate' options={templates} onChange={handleDropdownChange} />
            <br />
            <TextField fullWidth multiline rows={4} label='Template Description' name='description' onChange={handleFormChange}></TextField>
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

export default AddTemplate;