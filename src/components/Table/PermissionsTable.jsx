import * as React from 'react';
import StyledTable from './StyledTable/StyledTable';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Typography } from '@mui/material';

// TODO: trigger pop-up on click

const columns = [
  { field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
  { field: 'id', headerName: 'Employee ID', flex: 0.8, minWidth: 125 },
  { field: 'role', headerName: 'Role', flex: 1, minWidth: 200 },
  // { field: 'access', headerName: 'Access', flex: 0.8, minWidth: 125},
  {
    field: 'access',
    headerName: 'Edit Permissions',
    description: 'Check checkbox to give permission',
    flex: 0.8,
    minWidth: 300,
    sortable: false,
    renderCell: () => {
      return (
        <FormGroup>
          <Box sx={{ display: 'flex' }}>
            <Box mr={2}>
              <FormControlLabel control={<Checkbox onChange={() => { }} />} label={<Typography variant='body2'>Project Admin</Typography>} />
            </Box>
            <FormControlLabel control={<Checkbox onChange={() => { }} />} label={<Typography variant='body2'>System Admin</Typography>} />
          </Box>
        </FormGroup>
      )
    }
  },
];

// TODO: replace mock data with BE data, id to be resume id

export default function PermissionsTable({rows, onSelect}) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledTable columns={columns} rows={rows} />
    </div>
  );
}
