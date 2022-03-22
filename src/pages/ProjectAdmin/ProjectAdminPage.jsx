import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import TopBar from '../../components/TopBar';

const topBarButtons = [{
  text: 'Proposal Workspaces',
  url: '/project/workspaces',
},
{
  text: 'Employee Database',
  url: '/project/employees',
}];

const topBarRoles = [{
  text: 'Employee',
  url: '/employee',
},
{
  text: 'Project Admin',
  url: '/project',
},
{
  text: 'System Admin',
  url: '/system',
}];

export default function ProjectAdminPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flexGrow: 0, flexShrink: 1 }}>
        <TopBar buttons={topBarButtons} roles={topBarRoles} selectedRole='Project Admin' logoLink='/project' />
      </Box>
      <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}