import React from 'react';
import { useState } from 'react';
import EmployeePage from './EmployeePage';
import ResumeTable from '../../components/Table/ResumeTable';
import { Box, Typography } from '@mui/material';
import { mockResumes } from './__mocks__/mockResumes';
import SectorSelection from '../../containers/SectorSelection';

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
  const [resumes, setResumes] = useState(mockResumes);
  const [submitDialog, setSubmitDialog] = useState(false);
  const [selectedResumeId, setSelectedResumeId] = useState('');

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
        <ResumeTable rows={resumesToRows} onActionClick={setSubmitDialog} onSelectClick={setSelectedResumeId}/>
        <SectorSelection entries={
          [{type:'Projects', sectors:[]},
          {type:'Experience', sectors:[{key:2132, data:{description:'interesting', imageLink:'aaa.com', division:'D1', location:'Vancouver', name:'Experiencing experience'}}]},
          {type:'Education', sectors:[{key:2132, data:'middle School'}, {key:123, data:'High School'}, {key:1245, data:'Uni'}]}]} 
          resumeName={selectedResumeId ? resumes[selectedResumeId].projectName : 'Project Name'} open={submitDialog} onClose={() => { setSubmitDialog(false) }}></SectorSelection>
      </EmployeePage>
    </>
  )
}

export default EmployeeResume;