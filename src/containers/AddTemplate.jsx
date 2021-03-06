import { useEffect, useState, useRef } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';
import Dropdown from '../components/Dropdown';
import AlertPopup from '../components/AlertPopup';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Error from '../components/Error';
import axios from 'axios';

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

  const navigate = useNavigate();

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

  // const handleSubmit = (ev) => {
  //   console.log('creating template with values:');
  //   console.log(formValues);

  //   // TODO - display complete message based on submit success status
  //   setOpenCompleteMessage(true);
  //   handleClose();
  // }

  const handleCloseCompleteMessage = (ev) => {
    setOpenCompleteMessage(false)
  }

  const handleNoBaseTemplateSubmit = (ev) => {
    setSubmitDisabled(true);
    axios.post('/Template/Create', {
      title: formValues.name,
      description: formValues.description,
      sectorTypes: [],
    }).then((response) => {
      setOpenCompleteMessage({
        type: 'success',
        text: `Template ${formValues.name} has been successfully created.`
      });
      handleClose();
      navigate(`/system/templates/${response.data.templateId}`);
    }).catch((error) => {
      setSubmitDisabled(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while creating template. (${error.response.status} ${error.response.statusText})`
      });
    })
  }

  const handleSubmit = (ev) => {
    setSubmitDisabled(true);
    axios.get('Template/GetSectors', {
      params: {
        templateId: formValues.baseTemplate
      }
    }).then((response) => {
      console.log(response);
      axios.post('/Template/Create', {
        title: formValues.name,
        description: formValues.description,
        sectorTypes: response.data,
      }).then((response) => {
        setOpenCompleteMessage({
          type: 'success',
          text: `Template ${formValues.name} has been successfully created.`
        });
        handleClose();
        navigate(`/system/templates/${response.data.templateId}`);
      }).catch((error) => {
        setSubmitDisabled(false);
        setOpenCompleteMessage({
          type: 'error',
          text: `An error occurred while creating template. (${error.response.status} ${error.response.statusText})`
        });
      })
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
      <Dialog maxWidth='lg' fullWidth open={open}>
        <DialogTitle>
          Create Template
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form ref={formRef}>
            <TextField fullWidth required label='Template Name' variant='standard' name='name' onChange={handleFormChange} autoComplete='off'></TextField>
            <br />
            <br />
            <Dropdown label='Select Template' name='baseTemplate' options={templates} onChange={handleDropdownChange} />
            <br />
            <TextField fullWidth multiline rows={4} label='Template Description' name='description' onChange={handleFormChange}></TextField>
          </form>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={formValues.baseTemplate === '' ? handleNoBaseTemplateSubmit : handleSubmit} disabled={submitDisabled}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddTemplate;