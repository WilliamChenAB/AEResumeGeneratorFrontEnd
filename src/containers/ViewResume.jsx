import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Divider, IconButton, Dialog, DialogTitle, DialogContent, Box, Typography} from '@mui/material';
import { Close } from '@mui/icons-material';
import SideBarTabs from '../components/SideBarTabs'
import TextBox from '../components/TextBox/TextBox';
import ExperienceTextBox from '../components/TextBox/ExperienceTextBox';
import { colorToken  } from '../theme/colorToken';
import TextField from '@mui/material/TextField';


import { resumeSelectors } from '../slices/resumeSlice';


/**
 * Select Sector popup
 * @param resumeName name of associated resume we are selecting
 * @param open Boolean for if dialog is open
 * @param onClose Handler for when dialog should be closed
 * @returns SelectSectorPopUp
 */
function ViewResume({resumeName, open, onClose}){
  
  const tabs = useSelector(resumeSelectors.getResumeHeaders);
  const resume = useSelector(resumeSelectors.getResume);

  const [activeTab, setActiveTab] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const entries = tabs.map(tab => {
    return {name: tab, error: tabs[activeTab] === 'education' ? resume[tabs[activeTab]].sections.length === 0 : resume[tabs[activeTab]].length === 0}
  })

  const handleClose = (success) => {
    setSubmitDisabled(true);
    onClose(success);
  }

  const handleSubmit = (ev) => {
    handleClose(true);
  }


  const drawSectors = () => {
    return (
      <>
        {tabs[activeTab] === 'education' && 
          <>
            <Box mb={5}>
            <TextField
              id="edit-resume-experience-years"
              label="Years of Experience"
              defaultValue={resume[tabs[activeTab]].years}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
            </Box>
            {Object.entries(resume[tabs[activeTab]].sections).map(([sid, description]) => 
              <Box mb={5} key={sid}>
                <TextBox key={sid} id={sid} text={description} hideEdit />
              </Box>
            )}
          </>
        }
        {tabs[activeTab] === 'experience' &&  Object.entries(resume[tabs[activeTab]]).map(([sid, body]) => 
          <Box mb={5} key={sid}>
            <ExperienceTextBox key={sid} name={body.title} location={body.location} division={body.division} description={body.description} hideEdit/>
          </Box>
        )}
        {tabs[activeTab] !== 'education' && tabs[activeTab] !== 'experience' && Object.entries(resume[tabs[activeTab]]).map(([sid, description]) => 
          <Box mb={5} key={sid}>
            <TextBox key={sid} id={sid} text={description} hideEdit />
          </Box>
        )}
      </>
    )
  }




  return (
    <div>
      <Dialog fullWidth maxWidth='lg' open={open}>
        <DialogTitle>
          <Box sx={{display: 'flex', flexDirection: 'row' }}>
            <Box sx={{flexGrow: 1}}>
              <Typography variant="h2">{resumeName}</Typography>
            </Box>
            <Box sx={{alignItems:'flex-end'}}>
            <IconButton onClick={() => {handleClose(false);}}>
                <Close />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <Divider color='primary'/>
        <DialogContent style={{height:'600px', padding: '0px 0px 0px 0px'}}>
          <Box sx={{display: 'flex', flexDirection: 'row' }}>
            <Box sx={{width:300, height:'600px'}}>
              <SideBarTabs
                entries = {entries}
                showCheckBoxes = {false}
                color = {colorToken.brand.aeGreen}
                selectedColor = {colorToken.brand.aeBlue}
                textColor = {colorToken.greyPalette.white}
                onEntryClick = {setActiveTab} />
            </Box>
            <Divider color='primary' orientation="vertical" flexItem />
            <Box sx={{margin: 5, width: '100%', maxHeight: '100%', overflow: 'auto'}}>
              {drawSectors()}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
    
  );
}

export default ViewResume;