import { useEffect, useState, useRef } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
import AlertPopup from '../components/AlertPopup';
import LoadingButton from '../components/LoadingButton';
import Loading from '../components/Loading';
import Error from '../components/Error';
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
  const [errorStatus, setErrorStatus] = useState(false);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [templates, setTemplates] = useState([]);

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
    axios.post('/Resume/NewPersonal', null, {
      params: {
        // TODO - replace with user employeeId
        templateId: formValues.template,
        resumeName: formValues.name,
      }
    }).then((response) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Resume ${formValues.name} has been successfully created.`
      });
      handleClose();
      navigate(`/employee/resumes/${response.data.resumeId}`);
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

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setErrorStatus(false);
      axios.get('/Template/GetAll').then((response) => {
        setTemplates(response.data.map((template) => {
          return {
            id: template.templateId,
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
          {isLoading && <Loading text='Loading Templates...' />}
          {!isLoading && errorStatus && <Error text='Error retrieving templates.' response={errorStatus}></Error>}
          {!isLoading && !errorStatus &&
            <form ref={formRef}>
              <TextField fullWidth required label='Resume Name' variant='standard' name='name' onChange={handleFormChange} autoComplete='off'></TextField>
              <br />
              <br />
              <Dropdown required label='Resume Template' options={templates} name='template' onChange={handleDropdownChange}></Dropdown>
            </form>
          }
        </DialogContent>
        <DialogActions>
          <LoadingButton variant='contained' isLoading={isLoading} onClick={handleSubmit} disabled={submitDisabled}>Create</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddResume;