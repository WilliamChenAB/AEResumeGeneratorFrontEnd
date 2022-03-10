import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Profile from '../components/Profile';
import { colorToken  } from '../theme/colorToken';
import SideBarTabs from '../components/SideBarTabs';
import AddButton from '../components/AddButton';

const drawerWidth = 240;

export default function SideBar({ entries, setTab, color, title, subtitle, useButton, buttonText, buttonClick}) {
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
        <Profile title={title} subtitle={subtitle} />
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
      {
        useButton? <Box item sx={{ mb: 3, flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}><AddButton text={buttonText} onClick={buttonClick}/></Box>: null
      }
    </Drawer>
  );
}