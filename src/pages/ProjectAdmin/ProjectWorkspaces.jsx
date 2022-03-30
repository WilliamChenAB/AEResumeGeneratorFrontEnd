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
import { saveAs } from 'file-saver';

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
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [exportObj, setExportObj] = useState({});
  const [isExporting, setIsExporting] = useState(false);

  const navigate = useNavigate();

  const deleteWorkspace = () => {
    setIsDeleting(true);
    axios.delete('/Workspace/Delete', {
      params: {
        workspaceId: deleteWorkspaceOBJ.key,
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
    axios.get('/Workspace/GetPersonal'
    ).then((response) => {
      const responseData = response.data.map((workspace) => {
        const name = workspace.name === '' ? 'name' : workspace.name;
        return {
          id: workspace.workspaceId,
          proposalNum: workspace.proposalNumber,
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

  const exportResume = () => {
    setIsExporting(true);
    setErrorStatus(false);
    axios.get('/Export/ResumesInWorkspace', {
      params: {
        workspaceId: exportObj.id,
      },
      responseType: 'blob',
    }).then((response) => {
      setIsExporting(false);
      setShowExportDialog(false);
      return new Promise(resolve => {
        saveAs(response.data, `${exportObj.workspaceName}.zip`);
        resolve(true);
      })
    }).catch((error) => {
      setIsExporting(false);
      setErrorStatus(error.response);
      setShowExportDialog(false);
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
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
        {openCompleteMessage &&
          <AlertPopup type={openCompleteMessage.type} open onClose={() => { setOpenCompleteMessage(false) }}>
            {openCompleteMessage.text}
          </AlertPopup>
        }
        <ConfirmDelete nameToDelete={`workspace ${deleteWorkspaceOBJ?.workspaceName}`} open={showDeleteDialog} onClose={() => { setShowDeleteDialog(false) }} onConfirm={() => { deleteWorkspace() }} isDeleting={isDeleting} />
        <ConfirmDelete exporting={true} nameToDelete={`workspace ${exportObj?.workspaceName}`} open={showExportDialog} onClose={() => { setShowExportDialog(false) }} onConfirm={() => { exportResume() }} isDeleting={isExporting} />
        {isLoading && <Loading text='Loading Workspaces...' />}
        {!isLoading && errorStatus && <Error text='Error retrieving workspaces.' response={errorStatus}></Error>}
        {!isLoading &&  !errorStatus &&
          <>
            <Typography variant='h3'>PROPOSAL WORKSPACES</Typography>
            <Box my={3}>
            <AddButton text='Add Workspace' onClick={() => setShowWorkspaceDialog(true)} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box mb={1} sx={{ width: '40%' }}>
                <SearchBar placeholder='Search Workspaces' onChange={(value) => { tableFilter(value) }}></SearchBar>
              </Box>
            </Box>
            <AddWorkspace open={showWorkspaceDialog} onClose={() => setShowWorkspaceDialog(false)}></AddWorkspace>
            <WorkspaceTable onExportClicked={(workspaceObj) => { setExportObj(workspaceObj); setShowExportDialog(true) }} onDeleteClick={(workspaceObj) => { handleDeleteClick(workspaceObj) }} rows={rows} workSpaceExpanded={(id) => { navigate('/project/workspaces/'.concat(id)) }} />
          </>
        }
      </Box>
    </Box>
  )
}

export default ProjectWorkspaces;