import StyledTable from './StyledTable/StyledTable';

const columns = [
  { field: 'name', headerName: 'Name', flex: 0.5, minWidth: 200 },
  { field: 'jobTitle', headerName: 'Job Title', flex: 0.5, minWidth: 200 },
  { field: 'access', headerName: 'Access Level', flex: 0.5, minWidth: 200}
];

export default function WorkspaceEmoployeeTable({ rows, onSelect }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledTable columns={columns} rows={rows} onSelect={onSelect} selectable />
    </div>
  );
}
