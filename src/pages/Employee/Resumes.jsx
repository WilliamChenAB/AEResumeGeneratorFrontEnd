import { useEffect, useState } from 'react';
import ResumeTable from '../../components/Table/ResumeTable';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../containers/SideBar';
import AddResume from '../../containers/AddResume';
import SearchBar from '../../components/SearchBar';
import AddButton from '../../components/AddButton';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import axios from 'axios';

function Resumes() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [data, setData] = useState([]); // full data
  const [rows, setRows] = useState([]); // rows to display in table (with filter applied)
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState('');

  // Get all resumes for user
  useEffect(() => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Facade/GetResumesForEmployee', {
      params: {
        // TODO - replace with EID of logged in user
        EID: '5',
      }
    }).then((response) => {
      const responseData = response.data.map((resume) => {
        return {
          id: resume.rid,
          resumeName: `${resume.rid}`, // force name to be string
          updateDate: resume.lastEditedDate,
          status: 'STATUS',
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

  const tableFilter = (value) => {
    const filteredRows = data.filter((row) => {
      return row.resumeName.toLowerCase().includes(value.toLowerCase());
    });
    setRows(filteredRows);
  }

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box>
        <SideBar title='John Doe' subtitle='Utility Coordinator' color='primary' />
      </Box>
      <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
        {isLoading && <Loading text='Loading Resumes...' />}
        {!isLoading && errorStatus && <Error text='Error retrieving resumes.' response={errorStatus}></Error>}
        {!isLoading && !errorStatus &&
          <>
            <Typography variant='h3'>RESUMES</Typography>
            <br />
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '40%' }}>
                <SearchBar placeholder='Search Resumes' onChange={(value) => { tableFilter(value) }}></SearchBar>
              </Box>
              <AddButton text='Add Resume' onClick={() => setShowAddDialog(true)} />
            </Box>
            <ResumeTable rows={rows} handleSelect={(id) => { navigate(`/employee/resumes/${id}`) }} onSelectClick={setSelectedResumeId} />
            <AddResume open={showAddDialog} onClose={() => { setShowAddDialog(false) }}></AddResume>
          </>
        }
      </Box>
    </Box >
  )
}

export default Resumes;