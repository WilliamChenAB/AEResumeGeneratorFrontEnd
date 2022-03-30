import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Profile from '../components/Profile';
import { colorToken } from '../theme/colorToken';
import SideBarTabs from '../components/SideBarTabs';
import AddButton from '../components/AddButton';

const width = 240;

export default function SideBar({ entries, setTab, color, title, subtitle, useButton, buttonText, buttonClick, selected }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <Box
        justifyContent='flex-start'
        alignContent='flex-start'
        sx={{
          height: '100%',
          flexDirection: 'column',
          display: 'flex',
          width: width
        }}
      >
        <Box my={6} sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <Profile title={title} subtitle={subtitle} />
        </Box>
        {entries &&
          <SideBarTabs
            entries={entries}
            showCheckBoxes={false}
            color={color === 'primary' ? colorToken.brand.aeBlueMid : colorToken.brand.aeGreenLight}
            selectedColor={color === 'primary' ?  colorToken.brand.aeBlue: colorToken.brand.aeGreen}
            textColor={color === 'primary' ? colorToken.brand.aeBlueDark : colorToken.brand.aeBlue}
            selectedTextColor={colorToken.greyPalette.white }
            onEntryClick={setTab}
            onCheckmarkClicked={() => { }}
            selected={selected} />
        }
        {useButton &&
          <Box item sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
            <AddButton text={buttonText} onClick={buttonClick} />
          </Box>
        }
      </Box>
      <Divider orientation='vertical' sx={{ height: '100%' }} />
    </Box>
  );
}