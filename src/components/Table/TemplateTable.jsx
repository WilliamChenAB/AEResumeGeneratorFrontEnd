import StyledTable from './StyledTable/StyledTable';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TextButton from '../TextButton';
import { formatToLocalTime } from '../../utils/DateTime';

export default function TemplateTable({ rows, onSelectClick, handleSelect, onDeleteClick }) {
  const columns = [
    {
      field: 'name',
      headerName: 'Template Name',
      flex: 1.2,
      minWidth: 200,
      renderCell: (params) => {
        return <TextButton onClick={() => handleSelect(params.row.id)} text={params.row.name} />
      }
    },
    {
      field: 'updateDate',
      headerName: 'Last Updated',
      flex: 0.5,
      minWidth: 125,
      renderCell: (params) => {
        return formatToLocalTime(params.row.updateDate);
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      description: 'Click to delete',
      flex: 0.5,
      minWidth: 125,
      sortable: false,
      renderCell: (params) => {
        return (
          <Tooltip title='Click to delete template'>
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

