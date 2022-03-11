import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Profile from '../components/Profile';
import { colorToken } from '../theme/colorToken';
import SideBarTabs from '../components/SideBarTabs';
import AddButton from '../components/AddButton';

const width = 240;

export default function SideBar({ entries, setTab, color, title, subtitle, useButton, buttonText, buttonClick }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
      <Box
        sx={{
          height: '100%',
          flexDirection: 'column',
          display: 'flex', justifyContent: 'center', alignContent: 'center',
          width: width
        }}
      >
        <Box my={6} sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
          <Profile title={title} subtitle={subtitle} />
        </Box>
        {entries &&
          <SideBarTabs
            entries={entries}
            showCheckBoxes={false}
            color={color === 'primary' ? colorToken.brand.aeGreen : colorToken.brand.aeBlueLight}
            selectedColor={color === 'primary' ? colorToken.brand.aeBlue : colorToken.brand.aeBlueMid}
            textColor={color === 'primary' ? colorToken.greyPalette.white : colorToken.brand.aeBlue}
            onEntryClick={setTab}
            onCheckmarkClicked={() => { }} />
        }
        {useButton &&
          <Box item sx={{ flexGrow: 2, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
            <AddButton text={buttonText} onClick={buttonClick} />
          </Box>
        }
      </Box>
      <Divider orientation='vertical' sx={{ height: '100%' }} />
    </Box>

  );
}