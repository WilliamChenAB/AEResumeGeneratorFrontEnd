import { DataGrid } from '@mui/x-data-grid';
import './StyledTable.css';

export default function StyledTable(props) {
  return (
      <DataGrid
        className="StyledTable"
        rows={props.rows}
        columns={props.columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableColumnMenu
        disableSelectionOnClick
      />
  );
}