import * as React from 'react';
import StyledTable from './StyledTable/StyledTable';

// TODO: trigger pop-up on click

const columns = [
  { field: 'name', headerName: 'Name', flex: 0.5, minWidth: 200 },
  { field: 'id', headerName: 'Employee ID', flex: 0.5, minWidth: 200},
  { field: 'role', headerName: 'Role', flex: 0.5, minWidth: 200},
];

// TODO: replace mock data with BE data, id to be resume id

const rows = [
  { name: 'John Doe', id: '11111', role: 'Utility Coordination'},
  { name: 'James Johnson', id: '12345', role: 'Mechanical Engineer'},
  { name: 'Jane Doe', id: '22222', role: 'Project Administrator'},
  { name: 'Sarah Shaw', id: '23456', role: 'Bridge Designer'},
  { name: 'Nate Nichols', id: '34567', role: 'Bridge Designer'},
  { name: 'Marie McDonals', id: '45678', role: 'Bridge Designer'},
];

export default function PermissionsTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledTable columns={columns} rows={rows}/>
    </div>
  );
}
