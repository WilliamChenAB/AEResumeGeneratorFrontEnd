import * as React from 'react';
import StyledTable from './StyledTable/StyledTable';
import TextButton from '../TextButton';

// TODO: trigger pop-up on click


export default function ResumeTable({rows, onActionClick, onSelectClick}) {
  const columns = [
    { field: 'projectName', headerName: 'Project Name', flex: 1, minWidth: 300 },
    { field: 'updateDate', headerName: 'Last Updated', flex: 0.3, minWidth: 125},
    { field: 'status', headerName: 'Status', flex: 0.3, minWidth: 125},
    {
      field: 'action',
      headerName: 'Action',
      description: 'Click to submit or view resumes',
      flex: 0.2,
      minWidth: 100,
      renderCell: (params) => {
        return <TextButton onClick={() => onActionClick(true)} text={params.row.action}/>
      }
    },
  ];
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledTable columns={columns} rows={rows} onSelect={onSelectClick}/>
    </div>
  );
}
