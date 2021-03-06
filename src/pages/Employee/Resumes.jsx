import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../slices/userSlice';
import ResumeTable from '../../components/Table/ResumeTable';
import SideBar from '../../containers/SideBar';
import AddResume from '../../containers/AddResume';
import SearchBar from '../../components/SearchBar';
import AddButton from '../../components/AddButton';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import AlertPopup from '../../components/AlertPopup';
import ConfirmDelete from '../../containers/ConfirmDelete';
import EditEmployeeDetails from '../../containers/EditEmployeeDetails';
import axios from 'axios';

const RESUME_STATUS = {
  0: 'Regular',
  1: 'Requested',
  2: 'Exported',
}

function Resumes() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [data, setData] = useState([]); // full data
  const [rows, setRows] = useState([]); // rows to display in table (with filter applied)
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteResumeObj, setDeleteResumeObj] = useState({});
  const [showEmployeeDetailsDialog, setShowEmployeeDetailsDialog] = useState(false);

  const userName = useSelector(userSelectors.getName);
  const userTitle = useSelector(userSelectors.getTitle);

  const getAllResumes = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Resume/GetPersonal').then((response) => {
      const responseData = response.data.map((resume) => {
        return {
          id: resume.resumeId,
          resumeName: resume.name || 'untitled',
          updateDate: resume.lastEditedDate,
          status: RESUME_STATUS[resume.status],
        };
      });
      setData(responseData);
      setRows(responseData);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  const deleteResume = () => {
    setIsDeleting(true);
    axios.delete('/Resume/Delete', {
      params: {
        resumeId: deleteResumeObj.id,
      }
    }).then((response) => {
      setIsDeleting(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Resume ${deleteResumeObj.resumeName} has been permanently deleted.`
      });
      setShowDeleteDialog(false);
      getAllResumes();
    }).catch((error) => {
      setIsDeleting(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while deleting resume. (${error.response.status} ${error.response.statusText})`
      });
      setShowDeleteDialog(false);
    });
  };

  useEffect(() => {
    getAllResumes();
  }, []);

  const tableFilter = (value) => {
    const filteredRows = data.filter((row) => {
      return row.resumeName.toLowerCase().includes(value.toLowerCase());
    });
    setRows(filteredRows);
  }

  const handleDeleteClick = (resumeObj) => {
    setDeleteResumeObj(resumeObj);
    setShowDeleteDialog(true);
  }

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={() => { setOpenCompleteMessage(false) }}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      <ConfirmDelete nameToDelete={`resume ${deleteResumeObj?.resumeName}`} open={showDeleteDialog} onClose={() => { setShowDeleteDialog(false) }} onConfirm={() => { deleteResume() }} isDeleting={isDeleting} />
      <EditEmployeeDetails open={showEmployeeDetailsDialog} onClose={() => { setShowEmployeeDetailsDialog(false) }} />
      {isLoading && <Box sx={{ width: '100%' }}><Loading text='Loading Resumes...' /></Box>}
      {!isLoading && errorStatus && <Box sx={{ width: '100%' }}><Error text='Error retrieving resumes.' response={errorStatus} /></Box>}
      {!isLoading && !errorStatus &&
        <>
          <Box>
            <SideBar title={userName} subtitle={userTitle} color='primary' onProfileEdit={() => { setShowEmployeeDetailsDialog(true) }} />
          </Box>
          <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
            <Typography variant='h3'>RESUMES</Typography>
            <Box my={3}>
              <AddButton text='Add Resume' onClick={() => setShowAddDialog(true)} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box mb={1} sx={{ width: '40%' }}>
                <SearchBar placeholder='Search Resumes' onChange={(value) => { tableFilter(value) }}></SearchBar>
              </Box>
            </Box>
            <ResumeTable rows={rows} handleSelect={(id) => { navigate(`/employee/resumes/${id}`) }} onDeleteClick={(resumeObj) => { handleDeleteClick(resumeObj) }} />
            <AddResume open={showAddDialog} onClose={() => { setShowAddDialog(false) }}></AddResume>
          </Box>
        </>
      }
    </Box >
  )
}

export default Resumes;