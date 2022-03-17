import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import TopBar from '../../components/TopBar';

const topBarButtons = [{
  text: 'Resumes',
  url: '/employee/resumes',
},
{
  text: 'Edit Sectors',
  url: '/employee/sectors',
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

export default function EmployeePage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flexGrow: 0, flexShrink: 1 }}>
        <TopBar buttons={topBarButtons} roles={topBarRoles} selectedRole='Employee' />
      </Box>
      <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
}