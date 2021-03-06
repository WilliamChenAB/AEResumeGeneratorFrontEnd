import { useEffect, useState } from 'react';
import { Button, IconButton, Dialog, DialogTitle, DialogContent, Box, Tooltip } from '@mui/material';
import { Close } from '@mui/icons-material';
import WorkSpaceEmployeeTable from '../components/Table/WorkspaceEmployeeTable';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';
import AlertPopup from '../components/AlertPopup';
import ResumeSelection from '../containers/ResumeSelection.jsx';
import Loading from '../components/Loading';
import Error from '../components/Error';
import axios from 'axios';

function AddEmployee({ open, onClose, workspaceId, wname }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [data, setData] = useState([])
  const [rows, setRows] = useState([]);
  const [openResumeSelection, setOpenResumeSelection] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [chosenTemplate, setChosenTemplate] = useState('');

  useEffect(() => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Employee/GetAll').then((employeeResponse) => {
      axios.get('/Template/GetAll').then((response) => {
        setTemplates(response.data.map((template) => {
          return {
            id: template.templateId,
            name: template.title || 'untitled',
            description: template.description,
          };
        }));
        const responseData = employeeResponse.data.map((employee) => {
          return {
            id: employee.employeeId,
            name: `${employee.name}`, // force name to be string
            jobTitle: employee.jobTitle,
            access: employee.access === 0 ? 'Employee' : employee.access === 1 ? 'Project Admin' : 'System Admin',
          };
        });
        setData(responseData);
        setRows(responseData);
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
        setErrorStatus(error.response);
      });

    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }, []);

  const tableFilter = (searchVal) => {
    const filteredRows = data.filter((row) => {
      return String(row.name).toLowerCase().includes(searchVal.toLowerCase()) || String(row.jobTitle).toLowerCase().includes(searchVal.toLowerCase()) || String(row.access).toLowerCase().includes(searchVal.toLowerCase());
    });
    setRows(filteredRows);
  }

  const handleClose = (success) => {
    setEmployeeId('');
    setChosenTemplate('');
    onClose(success);
  }

  const handleFromResume = (ev) => {
    setOpenResumeSelection(true);
  }

  const handleNew = (ev) => {
    setIsLoading(true);
    axios.post('/Workspace/AddEmptyResume', null, {
      params: {
        workspaceId: workspaceId,
        templateId: chosenTemplate,
        employeeId: employeeId,
        resumeName: wname.concat(': ').concat(employeeName)
      }
    }).then((response) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Empty resume successfully added for ${employeeName}.`
      });
      setEmployeeId('');
      handleClose(true);
    }).catch((error) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while creating empty resume. (${error.response.status} ${error.response.statusText})`
      });
      setEmployeeId('');
      handleClose(true);
    });
  }

  const handleNewResumeRequest = (ev) => {
    console.log('requesting employee:');
    setIsLoading(true);
    axios.post('/Workspace/CreateTemplateRequest', null, {
      params: {
        templateId: chosenTemplate,
        employeeId: employeeId,
        workspaceId: workspaceId
      }
    }).then((response) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Resume successfully requested for ${employeeName}.`
      });
      setEmployeeId('');
      handleClose(true);
    }).catch((error) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while requesting resume. (${error.response.status} ${error.response.statusText})`
      });
      setEmployeeId('');
      handleClose(true);
    });
  }

  const handleCloseCompleteMessage = (ev) => {
    setOpenCompleteMessage(false)
  }

  const handleSubmitCopiedResume = (resumeId) => {
    axios.post('/Workspace/CopyResume', null, {
      params: {
        resumeId: resumeId,
        workspaceId: workspaceId,
      }
    }).then((response) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Resume successfully copied for ${employeeName}.`
      });
      setEmployeeId('');
      handleClose(true);
    }).catch((error) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while copying resume. (${error.response.status} ${error.response.statusText})`
      });
      setEmployeeId('');
      handleClose(true);
    });
  }

  return (
    <div>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={handleCloseCompleteMessage}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      <ResumeSelection open={openResumeSelection} employeeName={employeeName} employeeId={employeeId} onSubmit={(resumeId) => { handleSubmitCopiedResume(resumeId) }} onClose={() => { setOpenResumeSelection(false) }}></ResumeSelection>
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
              <Box sx={{ mt: 1, mb: 2, width: '40%' }}>
                <Dropdown required label='Resume Template' options={templates} name='template' onChange={(ev) => { setChosenTemplate(ev.target.value) }}></Dropdown>
              </Box>
              <Box mb={1}>
                <SearchBar defaultValue='' placeholder='Search Table...' onChange={(searchVal) => { tableFilter(searchVal); }} />
              </Box>
              <WorkSpaceEmployeeTable rows={rows} onSelect={(id) => {
                if (id.length === 0) {
                  setEmployeeName('');
                  setEmployeeId('');
                } else {
                  setEmployeeName(rows.filter((row) => row.id === id[0])[0]?.name);
                  setEmployeeId(id[0]);
                }
              }} />
              <Box my={1} mx={2} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
                <Tooltip title='Target employee and template required' placement='top'>
                  <span>
                    <Button variant='contained' onClick={handleNewResumeRequest} disabled={(employeeId === '' || chosenTemplate === '') ? true : false}>Request New Resume</Button>
                  </span>
                </Tooltip>
                <Tooltip title='Target employee required' placement='top'>
                  <span>
                    <Button variant='contained' onClick={handleFromResume} disabled={(employeeId === '') ? true : false}>Import Existing Resume</Button>
                  </span>
                </Tooltip>
                <Tooltip title='Target employee and template required' placement='top'>
                  <span>
                    <Button variant='contained' onClick={handleNew} disabled={(employeeId === '' || chosenTemplate === '') ? true : false}>Add New Empty Resume</Button>
                  </span>
                </Tooltip>
              </Box>
            </>}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddEmployee;