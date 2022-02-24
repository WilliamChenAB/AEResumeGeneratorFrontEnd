import * as React from 'react';
import StyledTable from './StyledTable/StyledTable';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

// TODO: update on click

const columns = [
  { field: 'name', headerName: 'Template Name', flex: 1, minWidth: 200 },
  { field: 'updateDate', headerName: 'Last Updated', flex: 0.5, minWidth: 125},
  {
    field: 'action',
    headerName: 'Action',
    description: 'Click to delete',
    flex: 0.5,
    minWidth: 125,
    sortable: false,
    renderCell: () => {
      const onClick = () => {}
      return (
        <IconButton onClick={onClick}>
          <DeleteIcon/>
        </IconButton>
      )
    }
  },
];

// TODO: replace mock data with BE data, id to be template id

const rows = [
  { id: '1', name: 'Power & Energy - Government', updateDate: '2/4/2022'},
  { id: '2', name: 'Commercial', updateDate: '2/5/2022'},
  { id: '3', name: 'Mechanical - Buildings', updateDate: '2/6/2022'},
];

export default function PermissionsTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledTable columns={columns} rows={rows}/>
    </div>
  );
}
