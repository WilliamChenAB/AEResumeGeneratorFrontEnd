import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Profile from '../components/Profile';
import { colorToken  } from '../theme/colorToken';
import SideBarTabs from '../components/SideBarTabs';
import AddButton from '../components/AddButton';

const drawerWidth = 250;

export default function SideBar2({ entries, setTab, color, title, subtitle, useButton, buttonText, buttonClick}) {
  return (
    <Box sx={{mt: -3.4, display: 'flex', flexDirection: 'row' }}>
      <Box
        sx={{
          height:"88vh",
          flexDirection: 'column',
          ml: -5, display: 'flex', justifyContent: 'center', alignContent: 'center',
          width: drawerWidth
        }}
      >
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
          useButton? <Box item sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}><AddButton text={buttonText} onClick={buttonClick}/></Box>: null
        }
      </Box>
      <Divider orientation='vertical' sx={{height:'100%'}}></Divider>
    </Box>
    
  );
}