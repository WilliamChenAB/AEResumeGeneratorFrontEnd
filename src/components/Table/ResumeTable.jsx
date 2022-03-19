import StyledTable from './StyledTable/StyledTable';
import TextButton from '../TextButton';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ResumeTable({ rows, onSelectClick, handleSelect, onDeleteClick }) {
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
    { field: 'updateDate', headerName: 'Last Updated', flex: 0.3, minWidth: 125 },
    { field: 'status', headerName: 'Status', flex: 0.3, minWidth: 125 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 0.2,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <Tooltip title='Click to delete resume'>
            <IconButton onClick={() => { onDeleteClick(params.row) }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )
      }
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledTable columns={columns} rows={rows} onSelect={onSelectClick} />
    </div>
  );
}
