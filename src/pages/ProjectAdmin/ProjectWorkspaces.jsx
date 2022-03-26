import { useEffect, useState } from 'react';
import WorkspaceTable from '../../components/Table/WorkspaceTable';
import { Box, Typography } from '@mui/material';
import AddButton from '../../components/AddButton';
import AddWorkspace from '../../containers/AddWorkspace';
import SearchBar from '../../components/SearchBar';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import AlertPopup from '../../components/AlertPopup';
import ConfirmDelete from '../../containers/ConfirmDelete';
import Error from '../../components/Error';
import axios from 'axios';

function ProjectWorkspaces() {
  const [showWorkspaceDialog, setShowWorkspaceDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [data, setData] = useState([]); // full data
  const [rows, setRows] = useState([]); // rows to display in table (with filter applied)
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteWorkspaceOBJ, setDeleteWorkspaceOBJ] = useState({});
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);

  const navigate = useNavigate();

  const eid = 1;


  const deleteWorkspace = () => {
    setIsDeleting(true);
    axios.delete('/Attributes/DeleteWorkspace', {
      params: {
        WID: deleteWorkspaceOBJ.key,
      }
    }).then((response) => {
      setIsDeleting(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Workspace ${deleteWorkspaceOBJ.resumeName} has been permanently deleted.`
      });
      setShowDeleteDialog(false);
      getWorkspaces();
    }).catch((error) => {
      setIsDeleting(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while deleting workspace. (${error.response.status} ${error.response.statusText})`
      });
      setShowDeleteDialog(false);
    });
  };

  const getWorkspaces = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Attributes/GetAllWorkspaces'
    ).then((response) => {
      const responseData = response.data.map((workspace) => {
        const name = workspace.name === '' ? 'name' : workspace.name;
        return {
          key: workspace.wid,
          id: workspace.proposalNumber,
          workspaceName: name,
          creationDate: workspace.creationDate,
          division: workspace.division
        };
      });
      setData(responseData);
      setRows(responseData);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  const exportResume = (workspaceObj) => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Facade/ExportResumesInWorkspace', {
      params: {
        WID: workspaceObj.key,
      }
    }).then((response) => {
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  useEffect(() => {
    getWorkspaces();
  }, []);

  const handleDeleteClick = (workspaceObj) => {
    setDeleteWorkspaceOBJ(workspaceObj);
    setShowDeleteDialog(true);
  }

  const tableFilter = (value) => {
    const filteredRows = data.filter((row) => {
      return String(row.workspaceName).toLowerCase().includes(value.toLowerCase()) || String(row.id).toLowerCase().includes(value.toLowerCase()) || String(row.division).toLowerCase().includes(value.toLowerCase());
    });
    setRows(filteredRows);
  }

  return (
    <Box sx={{ flexGrow: 1, height:'100%' }} className='content-section-margins'>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={() => { setOpenCompleteMessage(false) }}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      <ConfirmDelete nameToDelete={`workspace ${deleteWorkspaceOBJ?.workspaceName}`} open={showDeleteDialog} onClose={() => { setShowDeleteDialog(false) }} onConfirm={() => { deleteWorkspace() }} isDeleting={isDeleting} />
      {isLoading && <Box sx={{height:'100%', alignItems:"center", justifyContent:"center"}}><Loading text='Loading Workspaces...' /></Box>}
      {!isLoading && errorStatus && <Error text='Error retrieving workspaces.' response={errorStatus}></Error>}
      {!isLoading && !errorStatus &&
        <>
          <Box mb={4} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flexGrow: 1, alignItems: 'flex-end' }}>
              <Typography variant='h3'>PROPOSAL WORKSPACES</Typography>
            </Box>
            <SearchBar placeholder='Search Workspaces' onChange={(value) => { tableFilter(value) }}></SearchBar>
          </Box>
          <AddButton text='Add Workspace' onClick={() => setShowWorkspaceDialog(true)} />
          <AddWorkspace eid={eid} open={showWorkspaceDialog} onClose={() => setShowWorkspaceDialog(false)}></AddWorkspace>
          <WorkspaceTable onExportClicked={(workspaceObj) => {exportResume(workspaceObj)}} onDeleteClick={(workspaceObj) => { handleDeleteClick(workspaceObj) }} rows={rows} workSpaceExpanded={(id) => { navigate('/project/workspaces/'.concat(id)) }} />
        </>}

    </Box>
  )
}

export default ProjectWorkspaces;