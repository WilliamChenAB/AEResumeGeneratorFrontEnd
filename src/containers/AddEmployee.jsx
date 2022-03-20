import { useEffect, useState } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import WorkSpaceEmployeeTable from '../components/Table/WorkspaceEmployeeTable';
import SearchBar from '../components/SearchBar';
import AlertPopup from '../components/AlertPopup';
import Loading from '../components/Loading';
import Error from '../components/Error';
import axios from 'axios';

function AddEmployee({ open, onClose, wid, wname}) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [data, setData] = useState([])
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState('');


  useEffect(() => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Admin/GetAllEmployees').then((response) => {
      const responseData = response.data.map((employee) => {
        return {
          id: employee.eid ,
          name: `${employee.name}`, // force name to be string
          role: employee.access
        };
      });
      setData(responseData);
      setRows(responseData);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }, []);

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

  const handleFromResume = (ev) => {
    console.log('requesting employee:');
    console.log(employeeId);

    // TODO
    setEmployeeId('');
    setOpenCompleteMessage(true);
    handleClose(true);
  }

  const handleNew = (ev) => {
    console.log('requesting employee:');
    console.log(wid);
    console.log(employeeId);

    setIsLoading(true);
    axios.post('/Attributes/AddEmptyResumeToWorkspace', null, {params: {
      WID: wid,
      EID: employeeId,
      name: wname.concat(': ').concat(employeeName)
    }}).then((response) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Empty Resume added for employee: ${employeeName}.`
      });
      setEmployeeId('');
      handleClose(true);
    }).catch((error) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while creating blank resume. (${error.response.status} ${error.response.statusText})`
      });
    setEmployeeId('');
    handleClose(true);
    });
  }

  const handleNewResumeRequest = (ev) => {
    console.log('requesting employee:');
    console.log(employeeId);

    setIsLoading(true);
    axios.post('/Attributes/CreateTemplateRequest', null, {params: {
      // TODO - replace with actual template
      TemplateID: 1,
      EID: employeeId,
      WID: wid
    }}).then((response) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `resume Requested for employee ${employeeId}.`
      });
      setEmployeeId('');
      handleClose(true);
    }).catch((error) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while requesting Resume. (${error.response.status} ${error.response.statusText})`
      });
      

    setEmployeeId('');
    handleClose(true);
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
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => { handleClose(false) }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
        {isLoading && <Loading text='Loading...' />}
        {!isLoading && errorStatus && <Error text='Error.' response={errorStatus}></Error>}
        {!isLoading && !errorStatus &&
        <>
          <SearchBar placeholder='Search Table...' value={search} handleChange={(searchVal) => { setSearch(searchVal); tableFilter(searchVal) }} />
          <WorkSpaceEmployeeTable rows={rows} onSelect={(index) => {setEmployeeName(rows[index[0] - 1].name); setEmployeeId(rows[index[0] - 1].id);}} />
          <Box mx={2} sx={{ flexDirection: 'row' }}>
            <Button variant='contained' onClick={handleNewResumeRequest} disabled={employeeId === '' ? true : false}>Request New Resume</Button>
            <Button variant='contained' onClick={handleFromResume} disabled={employeeId === '' ? true : false}>Import Existing Resume</Button>
            <Button variant='contained' onClick={handleNew} disabled={employeeId === '' ? true : false}>Import By Sector</Button>
          </Box>
        </>}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddEmployee;