import StyledTable from './StyledTable/StyledTable';
import TextButton from '../TextButton';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpRounded from '@mui/icons-material/HelpRounded';
import { Box, Typography } from '@mui/material';
import CloseRounded from '@mui/icons-material/CloseRounded';
import { formatToLocalTime } from '../../utils/DateTime';

export default function ResumeTable({ rows, handleSelect, onDeleteClick }) {
  const columns = [
    {
      field: 'resumeName',
      headerName: 'Resume Name',
      flex: 1,
      minWidth: 300,
      renderCell: (params) => {
        return <TextButton onClick={() => { handleSelect(params.row.id) }} text={params.row.resumeName} />
      }
    },
    {
      field: 'updateDate',
      headerName: 'Last Updated',
      flex: 0.3,
      minWidth: 125,
      renderCell: (params) => {
        return formatToLocalTime(params.row.updateDate);
      }
    },
    {
      field: 'status', renderHeader: () => (
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Box mr={1}>
            <Typography variant='subtitle3'>Status</Typography>
          </Box>
          <Tooltip title='Employee created resumes and submitted requested resumes are Regular. Incomplete requested resumes are Requested'>
            <HelpRounded />
          </Tooltip>
        </Box>
      ), flex: 0.3, minWidth: 125
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: 0.2,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.status === 'Regular' ?
              <Tooltip title='Click to delete resume'>
                <IconButton onClick={() => { onDeleteClick(params.row) }}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip> :
              <Tooltip title='Click to cancel requested resume'>
                <IconButton onClick={() => { onDeleteClick(params.row) }}>
                  <CloseRounded />
                </IconButton>
              </Tooltip>}
          </>
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
