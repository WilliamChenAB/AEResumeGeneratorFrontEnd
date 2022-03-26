import { useState } from 'react';
import { Box, Button, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import AlertPopup from '../components/AlertPopup';
import Report from '@mui/icons-material/Report';
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

 const getAccessName = (accessID) => {
   if (accessID === 2) {
     return 'System Administrator'
   } 
   else if (accessID === 1) {
     return 'Project Administrator'
   }
   else {
     return 'Employee'
   }
}


function ConfirmAccessChange({ open, name, oldAccess, newAccess, onClose, onConfirm, isEditing }) {
  const handleClose = (ev) => {
    onClose();
  }

  return (
    <div>
      <Dialog maxWidth='sm' open={open}>
        <DialogTitle>
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={(ev) => { handleClose(ev) }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Report color='error' sx={{ width: '5em', height: '5em' }} />
            <br />
            <Typography variant='h1'>Are you sure?</Typography>
            <br />
            <Typography variant='body1'>You are about to change permission level of <strong>{name}</strong> from <strong>{getAccessName(oldAccess)}</strong> to <strong>{getAccessName(newAccess)}</strong>.</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={(ev) => { handleClose(ev) }}>Cancel</Button>
          <LoadingButton variant='outlined' color='error' onClick={() => onConfirm()} isLoading={isEditing}>Change Access</LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ConfirmAccessChange;