import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import TopBar from '../../components/TopBar';

const topBarButtons = [{
  text: 'Resume Templates',
  url: '/system/templates',
},
{
  text: 'Employee Permissions',
  url: '/system/employees',
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

export default function SystemAdminPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flexGrow: 0, flexShrink: 1 }}>
        <TopBar buttons={topBarButtons} roles={topBarRoles} selectedRole='System Admin' />
      </Box>
      <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}