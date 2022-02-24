import * as React from 'react';
import StyledTable from './StyledTable/StyledTable';
import IconButton from '@mui/material/IconButton';
import ExportIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';

// TODO: trigger pop-up on click

const columns = [
  { field: 'workspaceName', headerName: 'Workspace Name', flex: 1.2, minWidth: 200 },
  { field: 'id', headerName: 'Proposal No.', flex: 0.5, minWidth: 125},
  { field: 'division', headerName: 'Division', flex: 0.75, minWidth: 125},
  { field: 'owner', headerName: 'Owner', flex: 0.75, minWidth: 125},
  { field: 'updateDate', headerName: 'Update Date', flex: 0.5, minWidth: 125},
  {
    field: 'export',
    headerName: 'Actions',
    description: 'Click to edit export or delete',
    flex: 0.10,
    minWidth: 100,
    sortable: false,
    renderCell: () => {
      const onClick = () => {}
      return (
        <IconButton onClick={onClick}>
          <ExportIcon/>
        </IconButton>
      )
    }
  },
  {
    field: 'delete',
    headerName: '',
    description: '',
    flex: 0.10,
    minWidth: 100,
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

// TODO: replace mock data with BE data, id to be resume id

const rows = [
  { workspaceName: '37th Street SW Storm Trunk Relocation Contract', id: '11111', division: 'Water', owner: 'Jane Doe', updateDate: '2/23/2022'},
  { workspaceName: '38th Street SW Storm Trunk Relocation Contract', id: '11112', division: 'Bridge', owner: 'Jane Doe', updateDate: '2/6/2022'},
];

export default function WorkspaceTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledTable columns={columns} rows={rows}/>
    </div>
  );
}
