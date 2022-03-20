import { useEffect, useState } from 'react';
import WorkspaceTable from '../../components/Table/WorkspaceTable';
import { Box, Typography } from '@mui/material';
import { mockWorkspaces } from './__mocks__/mockWorkspaces';
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
  const [workspaces, setWorkspaces] = useState(mockWorkspaces);
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
    axios.get('/Attributes/GetAllWorkspacesForEmployee', {
      params: {
        // TODO - replace with EID of logged in user
        EID: eid,
      }
    }).then((response) => {
      const responseData = response.data.map((workspace) => {
        const name = workspace.name === '' ? 'name' : workspace.name;
        return {
          key: workspace.wid,
          id: workspace.proposalNumber,
          workspaceName: name, // force name to be string
          updateDate: workspace.lastEditedDate,
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

  useEffect(() => {
    getWorkspaces();
  }, []);

  const handleDeleteClick = (workspaceObj) => {
    setDeleteWorkspaceOBJ(workspaceObj);
    setShowDeleteDialog(true);
  }

  return (
    <Box className='content-section-margins'>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={() => { setOpenCompleteMessage(false) }}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      <ConfirmDelete nameToDelete={`workspace ${deleteWorkspaceOBJ?.workspaceName}`} open={showDeleteDialog} onClose={() => { setShowDeleteDialog(false) }} onConfirm={() => { deleteWorkspace() }} isDeleting={isDeleting} />
      {isLoading && <Loading text='Loading Workspaces...' />}
      {!isLoading && errorStatus && <Error text='Error retrieving workspaces.' response={errorStatus}></Error>}
      {!isLoading && !errorStatus &&
        <>
          <Box mb={4} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flexGrow: 1, alignItems: 'flex-end' }}>
              <Typography variant='h3'>PROPOSAL WORKSPACES</Typography>
            </Box>
            <SearchBar placeholder='Search Workspaces' onChange={() => { }}></SearchBar>
          </Box>
          <AddButton text='Add Workspace' onClick={() => setShowWorkspaceDialog(true)} />
          <AddWorkspace eid={eid} open={showWorkspaceDialog} onClose={() => setShowWorkspaceDialog(false)}></AddWorkspace>
          <WorkspaceTable onDeleteClick={(workspaceObj) => { handleDeleteClick(workspaceObj) }} rows={rows} onSelectClick={() => { }} workSpaceExpanded={(id) => { navigate('/project/workspaces/'.concat(id)) }} />
        </>}

    </Box>
  )
}

export default ProjectWorkspaces;