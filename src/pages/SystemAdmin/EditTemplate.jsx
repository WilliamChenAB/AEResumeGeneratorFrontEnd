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
import SideBar from '../../containers/SideBar'
import Divider from '@mui/material/Divider';

const mockTemplate = {
  name: 'Project Name',
  template:['experience','education','projects'],
}

function EditWorkspace() {
  const [activeTemplateTab, setActiveTemplateTab] = useState(0);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [workspaceId, setWorkspaceId] = useState('wid1'); //temp state for testing before store and BE

  const entries = mockTemplate.template.map(sector => { return ({ name: sector, error: false }) });

  return (
    <>
      <Box m={2}>
        <Typography variant='h3'>{mockTemplate.name}</Typography>
      </Box>
      <Divider />
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }} >
        <SideBarResumeTemplate entries={entries} setTab={(index) => { setActiveTemplateTab(index)}} color='primary'/>
        
        {/* {
          activeEmployeeTab !== -1 && mockWorkspaces[workspaceId] && entries[activeEmployeeTab] && <SideBar title={entries[activeEmployeeTab].name} color='secondary' setTab={setActiveSectorTypeTab} useButton={true} buttonText='Add Sector' buttonClick={() => { }} entries={getResumeEntries()}></SideBar>
        } */}
      </Box>

      <AddEmployee data={[]} open={openAddEmployee} onClose={() => (setOpenAddEmployee(false))}></AddEmployee>
    </>
  );
}

export default EditWorkspace;

