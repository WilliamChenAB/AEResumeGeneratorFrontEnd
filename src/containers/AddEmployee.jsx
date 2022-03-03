import { useState } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, Snackbar, Alert, Box} from '@mui/material';
import { Close } from '@mui/icons-material';
import WorkSpaceEmployeeTable from '../components/Table/WorkspaceEmployeeTable';
import SearchBar from '../components/SearchBar'; 

// TODO: replace mock data with BE data, id to be resume id

function AddEmployee({ open, onClose, data }) {
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [rows, setRows] = useState(data);
  const [search, setSearch] = useState('');

  const tableFilter = (searchVal) => {
    const filteredRows = data.filter((row) => {
      return row.name.toLowerCase().includes(searchVal.toLowerCase()) || row.id.toLowerCase().includes(searchVal.toLowerCase()) || row.role.toLowerCase().includes(searchVal.toLowerCase());
    });
    setRows(filteredRows);
  }

  const handleClose = (success) => {
    setEmployeeId('');
    onClose(success);
  }

  const handleSubmit = (ev) => {
    console.log('requesting employee:');
    console.log(employeeId);

    // TODO: fetch employee data from BE using employee id
    setEmployeeId('');
    setOpenCompleteMessage(true);
    handleClose(true);
  }

  const handleCloseCompleteMessage = (ev) => {
    setOpenCompleteMessage(false)
  }

  return (
    <div>
      <Snackbar anchorOrigin={{vertical: 'top', horizontal: 'center'}} open={openCompleteMessage} autoHideDuration={5000} onClose={handleCloseCompleteMessage}>
        <Alert severity='success' onClose={handleCloseCompleteMessage}>Employee {employeeId} has been successfully added.</Alert>
      </Snackbar>
      <Dialog maxWidth='lg' fullWidth open={open}>
        <DialogTitle>
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => {handleClose(false)}}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <SearchBar placeholder="Search Table..." value={search} handleChange={(searchVal) => {setSearch(searchVal); tableFilter(searchVal)}} />
          <WorkSpaceEmployeeTable rows={rows} onSelect={setEmployeeId}/>
          <Box mx={2} sx={{flexDirection: 'row'}}>
            <Button variant='contained' onClick={handleSubmit} disabled={employeeId === '' ? true : false}>Request New Resume</Button>
            <Button variant='contained' onClick={handleSubmit} disabled={employeeId === '' ? true : false}>Import Existing Resume</Button>
            <Button variant='contained' onClick={handleSubmit} disabled={employeeId === '' ? true : false}>Import By Sector</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddEmployee;