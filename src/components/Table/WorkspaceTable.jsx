import StyledTable from './StyledTable/StyledTable';
import IconButton from '@mui/material/IconButton';
import ExportIcon from '@mui/icons-material/FileDownload';
import DeleteIcon from '@mui/icons-material/Delete';
import TextButton from '../TextButton';
import Tooltip from '@mui/material/Tooltip'
import { Box } from '@mui/system';

export default function WorkspaceTable({ rows, workSpaceExpanded, onDeleteClick, onExportClicked }) {
  const columns = [
    {
      field: 'workspaceName',
      headerName: 'Workspace Name',
      flex: 1.2,
      minWidth: 200,
      renderCell: (params) => {
        return <TextButton onClick={() => { workSpaceExpanded(params.row.id) }} text={params.row.workspaceName} />
      }
    },
    { field: 'proposalNum', headerName: 'Proposal No.', flex: 0.5, minWidth: 125 },
    { field: 'division', headerName: 'Division', flex: 0.75, minWidth: 125 },
    { field: 'creationDate', headerName: 'Creation Date', flex: 0.5, minWidth: 125 },
    {
      field: 'export',
      headerName: 'Actions',
      description: 'Click to edit export or delete',
      flex: 0.10,
      minWidth: 150,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Tooltip title='Click to export all resumes in workspace'>
              <IconButton onClick={() => { onExportClicked(params.row) }}>
                <ExportIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title='Click to delete workspace'>
              <IconButton onClick={() => { onDeleteClick(params.row) }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
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
