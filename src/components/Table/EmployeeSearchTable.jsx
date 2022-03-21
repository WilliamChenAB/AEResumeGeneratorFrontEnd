import * as React from 'react';
import StyledTable from './StyledTable/StyledTable';
import TextButton from '../TextButton';


export default function EmployeeSearchTable({rows, resumesClicked, sectorsClicked}) {
  const columns = [
    { field: 'name', headerName: 'Name', flex: 0.5, minWidth: 200 },
    { field: 'id', headerName: 'Employee ID', flex: 0.3, minWidth: 125},
    { field: 'role', headerName: 'Role', flex: 0.5, minWidth: 200},
    {
      field: 'resumeAction',
      headerName: 'Action',
      description: 'Click to view resume or sector',
      flex: 0.4,
      minWidth: 125,
      sortable: false,
      renderCell: (params) => {
        return (
          <TextButton onClick={() => {resumesClicked(params.row.id, params.row.name)}} text='View Resumes'/>
        )
      }
    },
    {
      field: 'sectorAction',
      headerName: '',
      flex: 0.4,
      minWidth: 125,
      sortable: false,
      renderCell: (params) => {
        return (
          <TextButton onClick={() => {sectorsClicked(params.row.id, params.row.name)}} text='View Sectors'/>
        )
      }
    },
  ];
  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledTable columns={columns} rows={rows}/>
    </div>
  );
}
