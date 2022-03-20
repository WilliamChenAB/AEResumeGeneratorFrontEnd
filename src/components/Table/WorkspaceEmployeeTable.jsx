import * as React from 'react';
import StyledTable from './StyledTable/StyledTable';

const columns = [
  { field: 'name', headerName: 'Name', flex: 0.5, minWidth: 200 },
  { field: 'id', headerName: 'Employee ID', flex: 0.5, minWidth: 200},
  { field: 'role', headerName: 'Role', flex: 0.5, minWidth: 200},
];

export default function WorkspaceEmoployeeTable({rows, onSelect}) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledTable columns={columns} rows={rows} onSelect={onSelect}/>
    </div>
  );
}
