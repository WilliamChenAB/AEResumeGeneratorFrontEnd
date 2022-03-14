import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import AddButton from '../../components/AddButton';
import TemplateTable from '../../components/Table/TemplateTable';
import SearchBar from '../../components/SearchBar';
import SideBar from '../../containers/SideBar0';
import { mockRows } from './__mocks__/mockResumeTemplates';
import AddTemplate from '../../containers/AddTemplate';
import {useNavigate } from 'react-router-dom';

function ResumeTemplates() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box>
        <SideBar title='John Doe' subtitle='Utility Coordinator' color='primary' />
      </Box>
      <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
        <Box mb={4}>
          <Typography variant='h3'>RESUME TEMPLATES</Typography>
        </Box>
        {/* <SearchBar placeholder='Search Employee Database' onChange={()=>{}}></SearchBar> */}
        <AddButton text='Add Template' onClick={() => setShowAddDialog(!showAddDialog)}/>
        <TemplateTable rows={mockRows} onSelectClick={setSelectedTemplateId} handleSelect={() => {navigate('/system/editTemplate')}}/>
        <AddTemplate templates={[]} open={showAddDialog} onClose={() => setShowAddDialog(!showAddDialog)}/>
      </Box>
    </Box>

  )
}

export default ResumeTemplates;

// workSpaceExpanded={(id)=>{navigate('/project/editWorkspace')}}