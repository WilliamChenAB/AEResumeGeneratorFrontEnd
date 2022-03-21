import { useEffect, useState, useRef } from 'react';
import { Button, Grid, IconButton, Dialog, DialogTitle, DialogContent, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import AlertPopup from '../components/AlertPopup';
import axios from 'axios';

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
function AddWorkspace({ open, onClose, eid }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [templates, setTemplates] = useState([]);

  const navigate = useNavigate();
  const formRef = useRef();

  useEffect(() => {
    if (formRef.current?.checkValidity()) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }, [formValues]);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setErrorStatus(false);
      axios.get('/Facade/GetAllTemplates').then((response) => {
        setTemplates(response.data.map((template) => {
          return {
            id: template.templateID,
            name: template.title || 'untitled',
            description: template.description,
          };
        }));
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
        setErrorStatus(error.response);
      });
    }
  }, [open]);

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
    console.log(formValues);
    axios.post('/Attributes/NewWorkspace', null, {
      params: {
        proposalNumber: formValues.number,
        division: formValues.division,
        name: formValues.name,
        eid: 1
      }
    }).then((response) => {
      console.log(response);
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Workspace ${formValues.name} has been successfully created.`
      });
      handleClose();
      navigate(`/project/workspaces/${response.data.wid}`);
    }).catch((error) => {
      setIsLoading(false);
      setSubmitDisabled(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while creating workspace. (${error.response.status} ${error.response.statusText})`
      });

      handleClose();
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
            <TextField fullWidth type='number' required label='Project Number' variant='standard' name='number' onChange={handleFormChange}></TextField>
            <br />
            <br />
            <TextField fullWidth required label='Division' variant='standard' name='division' onChange={handleFormChange}></TextField>
            <br />
            <br />
            <TextField fullWidth label='Image Link' variant='standard' name='image' onChange={handleFormChange}></TextField>
            <br />
            <br />
            <Dropdown required label='Resume Template' options={templates} name='template' onChange={handleDropdownChange}></Dropdown>
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