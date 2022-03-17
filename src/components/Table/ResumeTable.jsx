import { useState } from 'react';
import StyledTable from './StyledTable/StyledTable';
import TextButton from '../TextButton';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import ConfirmDelete from '../../containers/ConfirmDelete';
import AlertPopup from '../AlertPopup';
import axios from 'axios';

// TODO: trigger pop-up on click


export default function ResumeTable({ rows, onSelectClick, handleSelect }) {
  const navigate = useNavigate();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteResumeObj, setDeleteResumeObj] = useState({});
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);

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
            <IconButton onClick={() => {
              setShowDeleteDialog(true);
              setDeleteResumeObj(params.row);
            }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )
      }
    },
  ];

  const deleteResume = () => {
    axios.delete('/Facade/DeleteResume', {
      params: {
        // TODO - replace with RID
        RID: deleteResumeObj.id,
      }
    }).then((response) => {
      setOpenCompleteMessage({
        type: 'success',
        text: `Resume ${deleteResumeObj.resumeName} has been permanently deleted.`
      });
      setShowDeleteDialog(false);
    }).catch((error) => {
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while deleting resume. (${error.response.status} ${error.response.statusText})`
      });
      setShowDeleteDialog(false);
    });
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <StyledTable columns={columns} rows={rows} onSelect={onSelectClick} />
      <ConfirmDelete nameToDelete={`resume ${deleteResumeObj.resumeName}`} open={showDeleteDialog} onClose={() => { setShowDeleteDialog(false) }} onConfirm={() => { deleteResume() }} />
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={() => { setOpenCompleteMessage(false) }}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
    </div>
  );
}
