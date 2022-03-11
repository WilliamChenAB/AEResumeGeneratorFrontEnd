import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ResumeTable from '../../components/Table/ResumeTable';
import { Box, Typography } from '@mui/material';
import { Outlet, useNavigate } from 'react-router-dom';
import { mockResumes } from './__mocks__/mockResumes';
import { resumeActions } from '../../slices/resumeSlice';
import SideBar from '../../containers/SideBar';

// TODO: replace mock data with BE data

// rid1: {
//   projectName: '37th Street SW Storm Trunk Relocation Contract',
//   updateDate: '-',
//   status: 'Requested',
//   action: 'Submit',
//   sectors: {
//     justification: {},
//     education: {
//       years: '',
//       sections: {},
//     },
//     summary: {},
//     experience: {},
//   },
// },

function EmployeeResume() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get resumes from BE
  const resumes = mockResumes;
  const [showDialog, setShowDialog] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState('');

  // fetch resumes from BE and set resumes using selectedResumeId
  dispatch(resumeActions.setResume(resumes[selectedResumeId]));



  // const entries = tabs.map(tab => {
  //   return {name: tab, error: Object.keys(sectorSections[activeTab]).length === 0}
  // })


  // get all employee entries using selectedResumeId

  const resumesToRows = Object.keys(resumes).map((rid) => {
    return { id: rid, projectName: resumes[rid].projectName, updateDate: resumes[rid].updateDate, status: resumes[rid].status, action: resumes[rid].action }
  });

  // TODO: update SectorSelection

  return (
    <Box sx={{ display: 'flex' }}>
      <Box>
        <SideBar title='John Doe' subtitle='Utility Coordinator' color='primary' />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box mb={4}>
          <Typography variant='h3'>RESUMES</Typography>
        </Box>
        <ResumeTable rows={resumesToRows} onActionClick={navigate('/employee/resumes/1')} onSelectClick={setSelectedResumeId} />
        {/*showDialog && resumes[selectedResumeId].action === 'Submit' && <SectorSelection resumeName={selectedResumeId ? resumes[selectedResumeId].projectName : ''} open={showDialog} onClose={() => { setShowDialog(false) }}></SectorSelection>*/}
        {/*showDialog && resumes[selectedResumeId].action === 'View' && <ViewResume resumeName={selectedResumeId ? resumes[selectedResumeId].projectName : ''} open={showDialog} onClose={() => { setShowDialog(false) }}></ViewResume>*/}
        <Outlet />
      </Box>
    </Box>
  )
}

export default EmployeeResume;