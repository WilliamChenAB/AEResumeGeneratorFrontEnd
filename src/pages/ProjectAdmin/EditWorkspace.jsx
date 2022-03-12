import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ExperienceTextBox from '../../components/TextBox/ExperienceTextBox';
import SectorSelection from '../../containers/SectorSelection';
import TextBox from '../../components/TextBox/TextBox';
import { Box, Icon, Typography } from '@mui/material';
import AddButton from '../../components/AddButton';
import SideBar from '../../containers/SideBar0';
import AddEmployee from '../../containers/AddEmployee';
import { mockWorkspaces } from './__mocks__/mockWorkspaces';
import { mockWorkspaceResumes } from './__mocks__/mockWorkspaceResumes';
import ErrorOutlineOutlined from '@mui/icons-material/ErrorOutlineOutlined';

Object.filter = function (obj, predicate) {
  let result = {}, key;

  return result;
};

function EditWorkspace() {
  const [activeEmployeeTab, setActiveEmployeeTab] = useState(0);
  const [activeSectorTypeTab, setActiveSectorTypeTab] = useState(-1);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [showSelectionDialog, setShowSelectionDialog] = useState(false);

  let { workspaceId } = useParams();
  console.log(workspaceId);

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

  const drawSectors = () =>{
    if (activeEmployeeTab === -1) {
      return null;
    }
    const employee = mockWorkspaces[workspaceId].employees[activeEmployeeTab];
    if (employee === undefined) {
      return null;
    }
    const resume = mockWorkspaceResumes[employee.id];
    if (resume === undefined) {
      return null;
    }
    const requested = resume.status === 'requested'? true: false;

    if(requested){
      return(
        <Box sx={{flexGrow:1, alignItems:'center', justifyContent:'center', display: 'flex'}}>
          <Box sx={{border:1, borderRadius: 2, borderColor: 'red', padding: 2, width: 300, height: 80}}>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
              <ErrorOutlineOutlined sx={{ fontSize: 30 , color:'red'}}/>
              <Box sx={{mt:0, ml:2, display: 'flex', flexDirection: 'column'}}>
                <Typography color='brown' variant='h2'>Resume Pending</Typography>
                <br />
                <Typography color='brown'>Will be uploaded once available</Typography>
              </Box>
            </Box>
          </Box>
        </Box>        
      );
    }else{
      const entries = getResumeEntries();
      const sectorName = entries[activeSectorTypeTab].name;

      if(resume.sectors[sectorName] === undefined){
        return (
          <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
            <Box mb={4}>
              <Typography variant='h3'>{sectorName.toUpperCase()}</Typography>
              <br />
              <br />
              <AddButton onClick={()=>{}} text="Add Blank Sector" />
            </Box>
          </Box>
        );
      }
      const sectors = Object.entries(resume.sectors[sectorName]);
      return(
        <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
          <Box mb={4}>
            <Typography variant='h3'>{sectorName.toUpperCase()}</Typography>
            <br />
            <br />
            <AddButton onClick={()=>{}} text="Add Blank Sector" />
          </Box>
          {sectorName === 'experience' && sectors.map(([sid, body]) =>
            <Box mb={5} key={sid}>
              <ExperienceTextBox key={sid} name={body.title} location={body.location} division={body.division} description={body.description} />
            </Box>
          )}
          {sectorName !== 'experience' && sectors.map(([sid, description]) => <Box mb={5} key={sid}><TextBox key={sid} text={description} /></Box>)}
        </Box>
      );
    }
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <SideBar title={name} entries={entries} setTab={(index) => { setActiveEmployeeTab(index); setActiveSectorTypeTab(-1) }} subtitle='' color='primary' useButton={true} buttonText='Add Employee' buttonClick={() => { setOpenAddEmployee(true) }} />
        {
          activeEmployeeTab !== -1 && mockWorkspaces[workspaceId] && entries[activeEmployeeTab] && <SideBar title={entries[activeEmployeeTab].name} color='secondary' setTab={setActiveSectorTypeTab} useButton={true} buttonText='Add Sector' buttonClick={() => {setShowSelectionDialog(true)}} entries={getResumeEntries()}></SideBar>
        }
        {
          activeEmployeeTab !== -1 && mockWorkspaces[workspaceId] && entries[activeEmployeeTab] && activeSectorTypeTab !== -1 && drawSectors()
        }
      </Box>
      <AddEmployee data={[]} open={openAddEmployee} onClose={() => (setOpenAddEmployee(false))}></AddEmployee>
      {
        activeEmployeeTab !== -1 && mockWorkspaces[workspaceId] && <SectorSelection resumeName='' open={showSelectionDialog} onClose={() => { setShowSelectionDialog(false) }} />
      }
      
    </>
  );
}

export default EditWorkspace;