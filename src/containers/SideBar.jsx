import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';

import Profile from '../components/Profile';
import { colorToken  } from '../theme/colorToken';
import SideBarTabs from '../components/SideBarTabs';

const drawerWidth = 240;

export default function SideBar({ entries, setTab, color }) {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar />
      <Box my={6} sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
        <Profile title='John Doe' subtitle='Utility Coordination' />
      </Box>
      {entries &&
        <SideBarTabs
          entries = {entries}
          showCheckBoxes = {false}
          color = {color === 'primary' ? colorToken.brand.aeGreen : colorToken.brand.aeBlueLight}
          selectedColor = {color === 'primary' ? colorToken.brand.aeBlue : colorToken.brand.aeBlueMid}
          textColor = {color === 'primary' ? colorToken.greyPalette.white : colorToken.brand.aeBlue}
          onEntryClick = {setTab}
          onCheckmarkClicked = {() => {}} />
      }
    </Drawer>
  );
}