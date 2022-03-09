import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, IconButton, Dialog, DialogTitle, DialogContent, Snackbar, Alert, Grid, Box, Typography} from '@mui/material';
import { Close } from '@mui/icons-material';
import SideBarTabs from '../components/SideBarTabs'
import TextBox from '../components/TextBox/TextBox';
import ExperienceTextBox from '../components/TextBox/ExperienceTextBox';
import { colorToken  } from '../theme/colorToken';
import TextField from '@mui/material/TextField';

import { sectorSelectors } from '../slices/sectorSlice';
import { resumeSelectors } from '../slices/resumeSlice';
import { resumeActions } from '../slices/resumeSlice';


/**
 * Select Sector popup
 * @param resumeName name of associated resume we are selecting
 * @param open Boolean for if dialog is open
 * @param onClose Handler for when dialog should be closed
 * @returns SelectSectorPopUp
 */
function SectorSelection({resumeName, open, onClose}){
  const dispatch = useDispatch();
  
  const tabs = useSelector(resumeSelectors.getResumeHeaders);
  const resume = useSelector(resumeSelectors.getResume);
  const sectorSections = useSelector(sectorSelectors.getSectors);
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const entries = tabs.map(tab => {
    return {name: tab, error: activeTab === 'education' ? resume[activeTab].sections.length === 0 : resume[activeTab].length === 0}
  })

  const onSelectAdd = (id, section) => {
    const updatedResume = Object.assign({}, resume[activeTab], {[id]: section});
    dispatch(resumeActions.updateSelectedSection({sector: activeTab, sections: updatedResume}))
  }

  const onSelectRemove = (id) => {
    const updatedResume = Object.assign({}, resume[activeTab]);
    delete updatedResume[id];
    dispatch(resumeActions.updateSelectedSection({sector: activeTab, sections: updatedResume}))
  }

  const handleSelect = (id, section) => {
    if (resume[activeTab].hasOwnProperty(id)) {
      onSelectRemove(id);
    }
    else {
      onSelectAdd(id, section);
    }
  }





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
        {activeTab === 'education' && 
          <>
            <Box mb={5}>
            <TextField
              id="edit-resume-experience-years"
              label="Years of Experience"
              defaultValue={sectorSections[activeTab].years}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
            />
            </Box>
            {/* key, text, selectState, selectable, onSelect, rows, hideEdit */}
            {Object.entries(sectorSections[activeTab].sections).map(([sid, description]) => 
              <Box mb={5} key={sid}>
                {/* <TextBox key={sid} text={description} onSelect={dispatch(resumeActions.addSelectedEducation(sectorSections.education[sid]))} hideEdit selectable/> */}
              </Box>
            )}
          </>
        }
        {activeTab === 'experience' &&  Object.entries(sectorSections[activeTab]).map(([sid, body]) => 
          <Box mb={5} key={sid}>
            <ExperienceTextBox key={sid} name={body.title} location={body.location} division={body.division} description={body.description} />
          </Box>
        )}
        {activeTab !== 'education' && activeTab !== 'experience' && Object.entries(sectorSections[activeTab]).map(([sid, description]) => 
          <Box mb={5} key={sid}>
            <TextBox key={sid} id={sid} text={description} selectState={resume[activeTab].hasOwnProperty(sid)} onSelect={() => handleSelect(sid, description)} hideEdit selectable/>
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
              <Button variant='contained' onClick={handleSubmit} disabled={submitDisabled}>Sumbit</Button>
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

export default SectorSelection;