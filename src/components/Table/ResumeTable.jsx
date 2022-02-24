import * as React from 'react';
import StyledTable from './StyledTable/StyledTable';
import TextButton from '../TextButton';

// TODO: trigger pop-up on click

const columns = [
  { field: 'projectName', headerName: 'Project Name', flex: 1, minWidth: 300 },
  { field: 'updateDate', headerName: 'Last Updated', flex: 0.3, minWidth: 125},
  { field: 'status', headerName: 'Status', flex: 0.3, minWidth: 125},
  {
    field: 'action',
    headerName: 'Action',
    description: 'Click to submit or view resumes',
    flex: 0.2,
    minWidth: 100,
    renderCell: (params) => {
      const onClick = () => {}
      return <TextButton onClick={onClick} text={params.row.action}/>
    }
  },
];

// TODO: replace mock data with BE data, id to be resume id

const rows = [
  { id: '1', projectName: '37th Street SW Storm Trunk Relocation Contract', updateDate: '-', status: 'Requested', action: 'Submit'},
  { id: '2', projectName: '38th Street SW Storm Trunk Relocation Contract', updateDate: '2/6/2022', status: 'Submiteed', action: 'View'},
  { id: '3', projectName: '39th Street SW Storm Trunk Relocation Contract', updateDate: '2/4/2022', status: 'Submitted', action: 'View'},

];

export default function EmployeeSearchTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledTable columns={columns} rows={rows}/>
    </div>
  );
}
