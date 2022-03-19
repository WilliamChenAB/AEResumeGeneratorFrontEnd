import { useState } from 'react';
import { Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import AlertPopup from '../components/AlertPopup';
import DangerousIcon from '@mui/icons-material/Dangerous';
import LoadingButton from '../components/LoadingButton';

/**
 * Confirm delete pop-up.
 * @param open Boolean for if dialog is open
 * @param nameToDelete Name of object about to be deleted
 * @param onClose Handler for when dialog should be closed
 * @param onConfirm Handler for when deletion is confirmed
 * @param isDeleting Whether or not delete request is in progress
 * @returns ConfirmDelete container
 */
function ConfirmDelete({ open, nameToDelete, onClose, onConfirm, isDeleting }) {
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);

  const handleClose = (ev) => {
    onClose();
  }

  return (
    <div>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={() => { }}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      <Dialog maxWidth='sm' open={open}>
        <DialogTitle>
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={(ev) => { handleClose(ev) }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <DangerousIcon color='error' sx={{ width: '5em', height: '5em' }} />
            <br />
            <Typography variant='h1'>Are you sure?</Typography>
            <br />
            <Typography variant='body1'>You are about to permanently delete {nameToDelete}. This cannot be undone.</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={(ev) => { handleClose(ev) }}>Cancel</Button>
          <LoadingButton variant='outlined' color='error' onClick={() => { onConfirm() }} isLoading={isDeleting}>Permanently Delete</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmDelete;