import * as React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import TopBar from '../../components/TopBar';
import SideBar from '../../containers/SideBar';

const topBarButtons = [{
  text: 'Resume Templates',
  url: '/system/templates',
},
{
  text: 'Employee Database',
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

export default function SystemAdminPage(props) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <TopBar buttons={topBarButtons} roles={topBarRoles} selectedRole='System Admin' />
      </AppBar>
      <SideBar entries={props.tabs} setTab={props.setTab} color='primary' />
      <Box component="main" mx={2} sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  );
}