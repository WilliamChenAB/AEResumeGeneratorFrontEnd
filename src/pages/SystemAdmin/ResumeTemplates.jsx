import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import AddButton from '../../components/AddButton';
import TemplateTable from '../../components/Table/TemplateTable';
import SearchBar from '../../components/SearchBar';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { mockRows } from './__mocks__/mockResumeTemplates';
import AddTemplate from '../../containers/AddTemplate';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


// export const mockRows = [
//   { id: '1', name: 'Power & Energy - Government', updateDate: '2/4/2022' },
//   { id: '2', name: 'Commercial', updateDate: '2/5/2022' },
//   { id: '3', name: 'Mechanical - Buildings', updateDate: '2/6/2022' },
// ];

const createRow = (data) => {
  return { id: data.templateID, name: data.title, updateDate: data.lastEdited }
}

function ResumeTemplates() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const navigate = useNavigate();

  const getTemplates = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Facade/GetAllTemplates').then((response) => {
      setTemplates(response.data.map((data) => createRow(data)));
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  useEffect(() => {
    getTemplates();
  }, []);






  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
        {isLoading && <Loading text='Loading Templates...' />}
        {!isLoading && errorStatus && <Error text='Error retrieving resume.' response={errorStatus}></Error>}
        {!isLoading && !errorStatus && <>
          <Box mb={4} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flexGrow: 1, alignItems: 'flex-end' }}>
              <Typography variant='h3'>RESUME TEMPLATES</Typography>
            </Box>
            <SearchBar placeholder='Search Templates' onChange={() => { }}></SearchBar>
          </Box>
          <AddButton text='Add Template' onClick={() => setShowAddDialog(!showAddDialog)} />
          <TemplateTable rows={templates} handleSelect={(id) => { navigate('/system/templates/'.concat(id)); }} />
          {showAddDialog &&
            <AddTemplate templates={templates} open={showAddDialog} onClose={() => setShowAddDialog(!showAddDialog)} />
          }
        </>
        }
      </Box>
    </Box>

  )
}

export default ResumeTemplates;

// workSpaceExpanded={(id)=>{navigate('/project/editWorkspace')}}