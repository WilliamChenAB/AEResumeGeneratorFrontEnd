import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmployeePage from './EmployeePage';
import ResumeTable from '../../components/Table/ResumeTable';
import { Box, Typography } from '@mui/material';
import { mockResumes } from './__mocks__/mockResumes';
import SectorSelection from '../../containers/SectorSelection';
import { sectorSelectors } from '../../slices/sectorSlice';
import { resumeActions } from '../../slices/resumeSlice';
import ViewResume from '../../containers/ViewResume';

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
      return {id: rid, projectName: resumes[rid].projectName, updateDate: resumes[rid].updateDate, status: resumes[rid].status, action: resumes[rid].action}
  });

  // TODO: update SectorSelection

  return(
    <>
      <EmployeePage>
        <Box mb={4}>
          <Typography variant='h3'>RESUMES</Typography>
        </Box>
        <ResumeTable rows={resumesToRows} onActionClick={setShowDialog} onSelectClick={setSelectedResumeId}/>
        {showDialog && resumes[selectedResumeId].action === 'Submit' && <SectorSelection resumeName={selectedResumeId ? resumes[selectedResumeId].projectName : ''} open={showDialog} onClose={() => { setShowDialog(false) }}></SectorSelection>}
        {showDialog && resumes[selectedResumeId].action === 'View' && <ViewResume resumeName={selectedResumeId ? resumes[selectedResumeId].projectName : ''} open={showDialog} onClose={() => { setShowDialog(false) }}></ViewResume>}
      </EmployeePage>
    </>
  )
}

export default EmployeeResume;