import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { colorToken } from '../theme/colorToken';
import SideBarTabs from '../components/SideBarTabs';
import AddButton from '../components/AddButton';

const width = 240;

export default function SideBarResumeTemplate({ entries, setTab, color, useButton, buttonText, buttonClick, onCheck, selected}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', overflow: 'auto' }}>
      <Box
        sx={{
          height: '100%',
          flexDirection: 'column',
          display: 'flex', justifyContent: 'flex-start', alignContent: 'center',
          width: width
        }}
      >
        {entries &&
          <SideBarTabs
            entries={entries}
            showCheckBoxes={true}
            color={color === 'primary' ? colorToken.brand.aeGreen : colorToken.brand.aeBlueLight}
            selectedColor={color === 'primary' ? colorToken.brand.aeBlue : colorToken.brand.aeBlueMid}
            textColor={color === 'primary' ? colorToken.greyPalette.white : colorToken.brand.aeBlue}
            onEntryClick={setTab}
            onCheckmarkClicked={onCheck} 
            selected={selected}/>
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