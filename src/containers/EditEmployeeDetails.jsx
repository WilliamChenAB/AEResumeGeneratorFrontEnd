import { useEffect, useState, useRef } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import { Close } from '@mui/icons-material';
import AlertPopup from '../components/AlertPopup';
import LoadingButton from '../components/LoadingButton';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelectors } from '../slices/userSlice';

/**
 * Add workspace pop-up.
 * @param open Boolean for if dialog is open
 * @param onClose Handler for when dialog should be closed
 * @returns AddWorkspace container
 */
function EditEmployeeDetails({ open, onClose }) {
  const dispatch = useDispatch();

  const userName = useSelector(userSelectors.getName);
  const userTitle = useSelector(userSelectors.getTitle);
  const userEmail = useSelector(userSelectors.getEmail);

  const defaultFormValues = {
    name: userName,
    jobTitle: userTitle,
    email: userEmail,
  };

  const [formValues, setFormValues] = useState(defaultFormValues);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (ev) => {
    setIsSubmitting(true);
    setSubmitDisabled(true);
    axios.put('/Employee/EditOwnBio', null, {
      params: {
        name: formValues.name,
        email: formValues.email,
        jobTitle: formValues.jobTitle,
      }
    }).then((response) => {
      setIsSubmitting(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Your details have been successfully updated.`
      });
      dispatch(userActions.editName(formValues.name));
      dispatch(userActions.editTitle(formValues.jobTitle));
      dispatch(userActions.editEmail(formValues.email));
      handleClose();
    }).catch((error) => {
      setIsSubmitting(false);
      setSubmitDisabled(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while updating your details. (${error.response.status} ${error.response.statusText})`
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
          Edit Employee Details
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form ref={formRef}>
            <TextField fullWidth required label='Employee Name' variant='standard' value={formValues.name} name='name' onChange={handleFormChange} autoComplete='off' />
            <br />
            <br />
            <TextField fullWidth required label='Job Title' variant='standard' value={formValues.jobTitle} name='jobTitle' onChange={handleFormChange} autoComplete='off' />
            <br />
            <br />
            <TextField fullWidth required label='Email Address' variant='standard' value={formValues.email} name='email' onChange={handleFormChange} autoComplete='off' />
          </form>
        </DialogContent>
        <DialogActions>
          <LoadingButton variant='contained' isLoading={isSubmitting} onClick={handleSubmit} disabled={submitDisabled}>Update</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EditEmployeeDetails;