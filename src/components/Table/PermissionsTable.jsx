import * as React from 'react';
import StyledTable from './StyledTable/StyledTable';
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';



export default function PermissionsTable({ rows, onEditPermission }) {
  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
    { field: 'id', headerName: 'Employee ID', flex: 0.8, minWidth: 125 },
    { field: 'role', headerName: 'Role', flex: 1, minWidth: 200 },
    {
      field: 'access',
      headerName: 'Access Level',
      description: 'Select one access level. System admins have Project admin permissions.',
      flex: 0.8,
      minWidth: 500,
      sortable: false,
      renderCell: (params) => {
        return (
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={params.row.access}
              onChange= {(event) => onEditPermission(params.row, parseInt(event.target.value))}
            >
              <FormControlLabel value={0} control={<Radio />} label="Employee" />
              <FormControlLabel value={1} control={<Radio />} label="Project Admin" />
              <FormControlLabel value={2} control={<Radio />} label="System Admin" />
            </RadioGroup>
          </FormControl>
        )
      }
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledTable columns={columns} rows={rows} />
    </div>
  );
}
