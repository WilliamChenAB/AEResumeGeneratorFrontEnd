import { useEffect, useState, useRef } from 'react';
import { Button, Grid, IconButton, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import AlertPopup from '../components/AlertPopup';
import Loading from '../components/Loading';
import Error from '../components/Error';
import axios from 'axios';

const defaultFormValues = {
  name: '',
};

function AddSectorType({ open, onClose, onSave }) {
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

  const handleCloseCompleteMessage = (ev) => {
    setOpenCompleteMessage(false)
  }


  const handleSubmit = (ev) => {
    setSubmitDisabled(true);
    axios.post('Admin/NewSectorType', {
      typeID: 3,
      title: formValues.name,
      description: "string",
      eid: 1
    }).then(() => {
      setOpenCompleteMessage({
        type: 'success',
        text: `Sector type ${formValues.name} has been successfully created.`
      });
      onSave();
      handleClose();
    }).catch((error) => {
      setSubmitDisabled(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while creating template. (${error.response.status} ${error.response.statusText})`
      });
    });
  }

  return (
    <div>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={handleCloseCompleteMessage}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      <Dialog maxWidth='md' fullWidth open={open}>
        <DialogTitle>
          Create Sector Type
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
            <form ref={formRef}>
              <TextField fullWidth required label='Sector Type Name' variant='standard' name='name' onChange={handleFormChange}></TextField>
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

export default AddSectorType;