import { useEffect, useState, useRef } from 'react';
import { Box, Button, CircularProgress, Grid, IconButton, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import AlertPopup from '../components/AlertPopup';
import axios from 'axios';

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
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
    setSubmitDisabled(true);
    console.log('creating resume with values:');
    console.log(formValues);

    axios.post('/Facade/NewResume', {
      // TODO - replace with user EID
      eid: 5,
      // TODO - more request body
    }).then((response) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Resume ${formValues.name} has been successfully created.`
      });
      handleClose();
      navigate(`/employee/resumes/${response.data.rid}`);
    }).catch((error) => {
      setIsLoading(false);
      setSubmitDisabled(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while creating resume. (${error.response.status} ${error.response.statusText})`
      });
    });
  }

  const handleCloseCompleteMessage = (ev) => {
    setOpenCompleteMessage(false)
  }

  return (
    <div>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={handleCloseCompleteMessage}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
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
              <Box sx={{ m: 1, position: 'relative' }}>
                <Button variant='contained' onClick={handleSubmit} disabled={submitDisabled}>Create</Button>
                {isLoading &&
                  <CircularProgress
                    size={24}
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                }
              </Box>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;