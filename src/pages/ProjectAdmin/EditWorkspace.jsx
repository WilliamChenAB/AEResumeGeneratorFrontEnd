import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ExperienceTextBox from '../../components/TextBox/ExperienceTextBox';
import TextBox from '../../components/TextBox/TextBox';
import TextField from '@mui/material/TextField';
import { Box, Typography } from '@mui/material';
import AddButton from '../../components/AddButton';
import SideBar from '../../containers/SideBar0';
import AddEmployee from '../../containers/AddEmployee';
import { mockWorkspaces } from './__mocks__/mockWorkspaces';
import { mockWorkspaceResumes } from './__mocks__/mockWorkspaceResumes';

Object.filter = function (obj, predicate) {
  let result = {}, key;

  return result;
};

function EditWorkspace() {
  const [activeEmployeeTab, setActiveEmployeeTab] = useState(0);
  const [activeSectorTypeTab, setActiveSectorTypeTab] = useState(-1);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [workspaceId, setWorkspaceId] = useState('wid1'); //temp state for testing before store and BE

  let entries = [];
  let name = "";
  if (mockWorkspaces[workspaceId]) {
    entries = mockWorkspaces[workspaceId].employees.map(obj => { return ({ name: obj.name, error: false }) });
    name = mockWorkspaces[workspaceId].workspaceName;
  }

  const getResumeEntries = () => {
    if (activeEmployeeTab === -1) {
      return null;
    }
    const employee = mockWorkspaces[workspaceId].employees[activeEmployeeTab];
    if (employee === undefined) {
      return null;
    }
    const resume = mockWorkspaceResumes[employee.id];
    if (resume !== undefined) {
      let retArray = [];
      for (const [key, value] of Object.entries(resume.sectors)) {
        retArray.push({ name: key, error: false });
      }
      for (let i = 0; i < resume.template.length; i++) {
        if (retArray.filter(entry => entry.name === resume.template[i]).length === 0) {
          retArray.push({ name: resume.template[i], error: true });
        }
      }
      return retArray;
    }
    return null;
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <SideBar title={name} entries={entries} setTab={(index) => { setActiveEmployeeTab(index); setActiveSectorTypeTab(-1) }} subtitle='' color='primary' useButton={true} buttonText='Add Employee' buttonClick={() => { setOpenAddEmployee(true) }} />
        {
          activeEmployeeTab !== -1 && mockWorkspaces[workspaceId] && entries[activeEmployeeTab] && <SideBar title={entries[activeEmployeeTab].name} color='secondary' setTab={setActiveSectorTypeTab} useButton={true} buttonText='Add Sector' buttonClick={() => { }} entries={getResumeEntries()}></SideBar>
        }
      </Box>

      <AddEmployee data={[]} open={openAddEmployee} onClose={() => (setOpenAddEmployee(false))}></AddEmployee>
    </>
  );
}

export default EditWorkspace;