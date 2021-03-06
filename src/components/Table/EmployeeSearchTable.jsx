import StyledTable from './StyledTable/StyledTable';
import TextButton from '../TextButton';
import { Box, Typography } from '@mui/material';
import { Tooltip } from '@mui/material';
import HelpRounded from '@mui/icons-material/HelpRounded';

export default function EmployeeSearchTable({ rows, resumesClicked, sectorsClicked }) {
  const columns = [
    { field: 'name', headerName: 'Name', flex: 0.5, minWidth: 180 },
    { field: 'email', headerName: 'Email Address', flex: 0.5, minWidth: 200 },
    { field: 'jobTitle', headerName: 'Job Title', flex: 0.2, minWidth: 150 },
    {
      field: 'resumeAction',
      renderHeader: () => (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Box mr={1}>
            <Typography variant='subtitle3'>Action</Typography>
          </Box>
          <Tooltip title='Click to view resume or sector'>
            <HelpRounded />
          </Tooltip>
        </Box>
      ),
      flex: 0.2,
      minWidth: 250,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ mr: 5 }}>
              <TextButton onClick={() => { resumesClicked(params.row.id, params.row.name) }} text='View Resumes' />
            </Box>
            <Box>
              <TextButton onClick={() => { sectorsClicked(params.row.id, params.row.name) }} text='View Sectors' />
            </Box>
          </Box>
        );
      }
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledTable columns={columns} rows={rows} />
    </div>
  );
}
