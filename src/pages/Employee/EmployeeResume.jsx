import React from 'react';
import EmployeePage from './EmployeePage';
import ResumeTable from '../../components/Table/ResumeTable'

// TODO: replace mock data with BE data, id to be resume id

const rows = [
  { id: '1', projectName: '37th Street SW Storm Trunk Relocation Contract', updateDate: '-', status: 'Requested', action: 'Submit'},
  { id: '2', projectName: '38th Street SW Storm Trunk Relocation Contract', updateDate: '2/6/2022', status: 'Submiteed', action: 'View'},
  { id: '3', projectName: '39th Street SW Storm Trunk Relocation Contract', updateDate: '2/4/2022', status: 'Submitted', action: 'View'},

];

function EmployeeHome() {
  return(
    <>
      <EmployeePage>
        <ResumeTable rows={rows}/>
      </EmployeePage>
    </>
  )
}

export default EmployeeHome;