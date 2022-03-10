import * as React from 'react';
import StyledTable from './StyledTable/StyledTable';
import IconButton from '@mui/material/IconButton';
import ExportIcon from '@mui/icons-material/Logout';
import DeleteIcon from '@mui/icons-material/Delete';
import TextButton from '../TextButton';

// TODO: trigger pop-up on click

export default function WorkspaceTable({ rows, onSelectClick, workSpaceExpanded}) {
  const columns = [
    { field: 'workspaceName', 
      headerName: 'Workspace Name', 
      flex: 1.2, 
      minWidth: 200,
      renderCell: (params) => {
        return <TextButton onClick={() => {workSpaceExpanded(params.row.id)}} text={params.row.workspaceName}/>
      }
    },
    { field: 'id', headerName: 'Proposal No.', flex: 0.5, minWidth: 125 },
    { field: 'division', headerName: 'Division', flex: 0.75, minWidth: 125 },
    { field: 'owner', headerName: 'Owner', flex: 0.75, minWidth: 125 },
    { field: 'updateDate', headerName: 'Update Date', flex: 0.5, minWidth: 125 },
    {
      field: 'export',
      headerName: 'Actions',
      description: 'Click to edit export or delete',
      flex: 0.10,
      minWidth: 100,
      sortable: false,
      renderCell: () => {
        const onClick = () => { }
        return (
          <IconButton onClick={onClick}>
            <ExportIcon />
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
        const onClick = () => { }
        return (
          <IconButton onClick={onClick}>
            <DeleteIcon />
          </IconButton>
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
