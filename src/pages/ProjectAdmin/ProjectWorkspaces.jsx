import { useState } from 'react';
import WorkspaceTable from '../../components/Table/WorkspaceTable';
import { Box, Typography } from '@mui/material';
import { mockWorkspaces } from './__mocks__/mockWorkspaces';
import AddButton from '../../components/AddButton';
import AddWorkspace from '../../containers/AddWorkspace';
import SearchBar from '../../components/SearchBar';
import {useNavigate } from 'react-router-dom';

function ProjectWorkspaces() {
  const [workspaces, setWorkspaces] = useState(mockWorkspaces);
  const [showWorkspaceDialog, setShowWorkspaceDialog] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState('');
  const navigate = useNavigate();

  const workspacesToRows = Object.keys(workspaces).map((wid) => {
    return { key: wid, id: workspaces[wid].id, workspaceName: workspaces[wid].workspaceName, updateDate: workspaces[wid].updateDate, division: workspaces[wid].division, owner: workspaces[wid].owner }
  });

  return (
    <Box className='content-section-margins'>
      <Box mb={4} sx={{display: 'flex', flexDirection: 'row'}}>
        <Box sx={{flexGrow:1, alignItems:'flex-end'}}>
          <Typography variant='h3'>PROPOSAL WORKSPACES</Typography>
        </Box>
        <SearchBar placeholder='Search Workspaces' onChange={()=>{}}></SearchBar>
      </Box>
      <AddButton text='Add Workspace' onClick={() => setShowWorkspaceDialog(true)} />
      <AddWorkspace open={showWorkspaceDialog} onClose={() => setShowWorkspaceDialog(false)}></AddWorkspace>
      <WorkspaceTable rows={workspacesToRows} onSelectClick={setSelectedWorkspaceId} workSpaceExpanded={(id)=>{navigate('/project/workspaces/'.concat(id))}}/>
    </Box>
  )
}

export default ProjectWorkspaces;