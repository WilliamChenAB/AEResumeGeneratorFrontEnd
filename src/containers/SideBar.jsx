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
            color={color === 'primary' ? colorToken.brand.aeGreenLight : colorToken.brand.aeBlueLight}
            selectedColor={color === 'primary' ? colorToken.brand.aeGreen : colorToken.brand.aeBlueMid}
            textColor={color === 'primary' ? colorToken.greyPalette.iconGrey : colorToken.brand.aeBlue}
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