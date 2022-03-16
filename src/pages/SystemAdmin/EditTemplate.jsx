import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ExperienceTextBox from '../../components/TextBox/ExperienceTextBox';
import TextBox from '../../components/TextBox/TextBox';
import TextField from '@mui/material/TextField';
import { Box, Typography } from '@mui/material';
import AddButton from '../../components/AddButton';
import SideBarResumeTemplate from '../../containers/SideBarResumeTemplate';
import AddEmployee from '../../containers/AddEmployee';
// import { mockWorkspaces } from './__mocks__/mockWorkspaces';
// import { mockWorkspaceResumes } from './__mocks__/mockWorkspaceResumes';
import Divider from '@mui/material/Divider';

const mockTemplate = {
  name: 'Project Name',
  template: ['experience', 'education', 'projects'],
}

function EditWorkspace() {
  const [activeTemplateTab, setActiveTemplateTab] = useState(0);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [workspaceId, setWorkspaceId] = useState('wid1'); //temp state for testing before store and BE

  const entries = mockTemplate.template.map(sector => { return ({ name: sector, error: false }) });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box m={2}>
        <Typography variant='h3'>{mockTemplate.name}</Typography>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }} >
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <SideBarResumeTemplate entries={entries} setTab={(index) => { setActiveTemplateTab(index) }} color='primary' />
          <Box m={2}>
            <AddButton text='Add sector'/>
          </Box>
        </Box>
        <Box m={4} sx={{ width: '100%' }}>
          <Typography variant='h3'>{entries[activeTemplateTab].name.toUpperCase()}</Typography>
          <Box my={3}>
            <TextBox rows={5} hideEdit></TextBox>
          </Box>
        </Box>
      </Box>

      <AddEmployee data={[]} open={openAddEmployee} onClose={() => (setOpenAddEmployee(false))}></AddEmployee>
    </Box>
  );
}

export default EditWorkspace;
