import { Snackbar, Alert } from '@mui/material';

/**
 * Alert popup using Snackbar.
 * @param children Content to display in alert.
 * @param type Type of alert. One of: success, error, warning, info
 * @param open Whether or not the alert is open
 * @param onClose Handler for when alert is closed
 * @returns AlertPopup component
 */
function AlertPopup({ children, type, open, onClose }) {
  return (
    <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center' }} open={open} autoHideDuration={5000} onClose={onClose}>
      <Alert severity={type} onClose={onClose}>{children}</Alert>
    </Snackbar>
  );
}

export default AlertPopup;