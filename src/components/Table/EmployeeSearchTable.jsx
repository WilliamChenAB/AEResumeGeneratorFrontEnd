import StyledTable from './StyledTable/StyledTable';
import TextButton from '../TextButton';
import { Box } from '@mui/system';

export default function EmployeeSearchTable({ rows, resumesClicked, sectorsClicked }) {
  const columns = [
    { field: 'name', headerName: 'Name', flex: 0.5, minWidth: 200 },
    { field: 'id', headerName: 'Employee ID', flex: 0.4, minWidth: 125 },
    { field: 'role', headerName: 'Role', flex: 0.2, minWidth: 200 },
    {
      field: 'resumeAction',
      headerName: 'Action',
      description: 'Click to view resume or sector',
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
