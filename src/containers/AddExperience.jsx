import { useEffect, useState, useRef } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';

/**
 * Add Experience Sector pop-up.
 * @param open Boolean for if dialog is open
 * @param onClose Handler for when dialog should be closed
 * @param startingDiv Division text
 * @param startingImage Image URL
 * @param startingContent Content text
 * @returns AddExperience dialog
 */
function AddExperience({ open, onClose, startingDiv, startingImage, startingContent }) {
  const [formValues, setFormValues] = useState({ division: startingDiv, image: startingImage, content: startingContent });
  const [submitDisabled, setSubmitDisabled] = useState(true);

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
    handleClose(true);
  }

  return (
    <div>
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