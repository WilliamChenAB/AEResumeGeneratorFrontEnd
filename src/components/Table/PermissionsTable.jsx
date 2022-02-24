import * as React from 'react';
import StyledTable from './StyledTable/StyledTable';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

// TODO: trigger pop-up on click

const columns = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
  { field: 'id', headerName: 'Employee ID', flex: 0.8, minWidth: 125},
  { field: 'role', headerName: 'Role', flex: 1, minWidth: 200},
  { field: 'access', headerName: 'Access', flex: 0.8, minWidth: 125},
  {
    field: 'edit',
    headerName: 'Edit Access',
    description: 'Click to edit access',
    flex: 0.5,
    minWidth: 125,
    sortable: false,
    renderCell: () => {
      const onClick = () => {}
      return (
        <IconButton onClick={onClick}>
          <EditIcon/>
        </IconButton>
      )
    }
  },
];

// TODO: replace mock data with BE data, id to be resume id

const rows = [
  { name: 'John Doe', id: '11111', role: 'Utility Coordination', access: 'Employee'},
  { name: 'James Johnson', id: '12345', role: 'Mechanical Engineer', access: 'Employee'},
  { name: 'Jane Doe', id: '22222', role: 'Project Administrator', access: 'Employee'},
];

export default function PermissionsTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledTable columns={columns} rows={rows}/>
    </div>
  );
}
