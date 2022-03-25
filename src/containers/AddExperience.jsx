import { useEffect, useState, useRef } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';
import AlertPopup from '../components/AlertPopup';

/**
 * Add Experience Sector pop-up.
 * @param open Boolean for if dialog is open
 * @param onClose Handler for when dialog should be closed
 * @returns AddExperience container
 */
function AddExperience({ open, onClose, startingDiv, startingImage, startingContent }) {
  const [formValues, setFormValues] = useState({ division: startingDiv, image: startingImage, content: startingContent });
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
    onClose(success, formValues.division, formValues.image, formValues.content);
  }

  const handleFormChange = (ev) => {
    setFormValues({
      ...formValues,
      [ev.target.name]: ev.target.value
    });
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
      <AlertPopup type='success' open={openCompleteMessage} onClose={handleCloseCompleteMessage}>Experience Sector for project {formValues.name} has been successfully created.</AlertPopup>
      <Dialog maxWidth='lg' fullWidth open={open}>
        <DialogTitle>
          Edit Sector
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => { handleClose(false); }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form ref={formRef}>
            <TextField fullWidth defaultValue={startingImage} label='Image Link' variant='standard' name='image' onChange={handleFormChange} autoComplete='off'></TextField>
            <br />
            <br />
            <TextField fullWidth defaultValue={startingDiv} label='Division' variant='standard' name='division' onChange={handleFormChange} autoComplete='off'></TextField>
            <br />
            <br />
            <TextField required defaultValue={startingContent} fullWidth multiline rows={4} label='Content' name='content' onChange={handleFormChange}></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleSubmit} disabled={submitDisabled}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddExperience;