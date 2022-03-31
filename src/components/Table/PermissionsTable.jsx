import StyledTable from './StyledTable/StyledTable';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import HelpRounded from '@mui/icons-material/HelpRounded';
import { Box, Typography } from '@mui/material';
import { Tooltip } from '@mui/material';

export default function PermissionsTable({ rows, onEditPermission }) {
  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 200 },
    { field: 'email', headerName: 'Email Address', flex: 1, minWidth: 180 },
    { field: 'role', headerName: 'Role', flex: 0.8, minWidth: 150 },
    {
      field: 'access',
      renderHeader: () => (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Box mr={1}>
            <Typography variant='subtitle3'>Access Level</Typography>
          </Box>
          <Tooltip title='Select one access level. System Admins have Project Admin permissions.'>
            <HelpRounded />
          </Tooltip>
        </Box>
      ),
      flex: 0.8,
      minWidth: 500,
      sortable: false,
      renderCell: (params) => {
        return (
          <FormControl>
            <RadioGroup
              row
              aria-labelledby='demo-row-radio-buttons-group-label'
              name='row-radio-buttons-group'
              value={params.row.access}
              onChange={(event) => onEditPermission(params.row, parseInt(event.target.value))}
            >
              <FormControlLabel value={0} control={<Radio />} label='Employee' />
              <FormControlLabel value={1} control={<Radio />} label='Project Admin' />
              <FormControlLabel value={2} control={<Radio />} label='System Admin' />
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
