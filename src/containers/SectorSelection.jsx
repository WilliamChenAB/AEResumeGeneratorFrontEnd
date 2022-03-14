import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import SideBarTabs from '../components/SideBarTabs'
import TextBox from '../components/TextBox/TextBox';
import ExperienceTextBox from '../components/TextBox/ExperienceTextBox';
import { colorToken } from '../theme/colorToken';
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
function SectorSelection({ resumeName, open, onClose }) {
  const dispatch = useDispatch();

  const tabs = useSelector(resumeSelectors.getResumeHeaders);
  const resume = useSelector(resumeSelectors.getResume);
  const sectorSections = useSelector(sectorSelectors.getSectors);
  const [activeTab, setActiveTab] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const entries = tabs.map(tab => {
    return { name: tab, error: tabs[activeTab] === 'education' ? resume[tabs[activeTab]].sections.length === 0 : resume[tabs[activeTab]].length === 0 }
  })

  const onSelectAdd = (id, section) => {
    const updatedResume = Object.assign({}, resume[tabs[activeTab]], { [id]: section });
    dispatch(resumeActions.updateSelectedSection({ sector: tabs[activeTab], sections: updatedResume }))
  }

  const onSelectRemove = (id) => {
    const updatedResume = Object.assign({}, resume[tabs[activeTab]]);
    delete updatedResume[id];
    dispatch(resumeActions.updateSelectedSection({ sector: tabs[activeTab], sections: updatedResume }))
  }

  const handleSelect = (id, section) => {
    if (resume[tabs[activeTab]].hasOwnProperty(id)) {
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
        {tabs[activeTab] === 'education' &&
          <>
            <Box mb={5}>
              <TextField
                id="edit-resume-experience-years"
                label="Years of Experience"
                defaultValue={sectorSections[tabs[activeTab]].years}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
            </Box>
            {Object.entries(sectorSections[tabs[activeTab]].sections).map(([sid, description]) =>
              <Box mb={5} key={sid}>
                <TextBox key={sid} id={sid} text={description} selectState={resume[tabs[activeTab]].hasOwnProperty(sid)} onSelect={() => handleSelect(sid, description)} hideEdit selectable />
              </Box>
            )}
          </>
        }
        {tabs[activeTab] === 'experience' && Object.entries(sectorSections[tabs[activeTab]]).map(([sid, body]) =>
          <Box mb={5} key={sid}>
            <ExperienceTextBox key={sid} name={body.title} location={body.location} division={body.division} description={body.description} hideEdit />
          </Box>
        )}
        {tabs[activeTab] !== 'education' && tabs[activeTab] !== 'experience' && Object.entries(sectorSections[tabs[activeTab]]).map(([sid, description]) =>
          <Box mb={5} key={sid}>
            <TextBox key={sid} id={sid} text={description} selectState={resume[tabs[activeTab]].hasOwnProperty(sid)} onSelect={() => handleSelect(sid, description)} hideEdit selectable />
          </Box>
        )}
      </>
    )
  }

  return (
    <div>
      <Dialog fullWidth maxWidth='lg' open={open}>
        <DialogTitle>
          <Typography variant='h2'>{resumeName}</Typography>
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => { handleClose(false); }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider color='primary' />
        <DialogContent style={{ height: '600px', padding: '0px 0px 0px 0px' }}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ width: 300, height: '600px' }}>
              <SideBarTabs
                entries={entries}
                showCheckBoxes={false}
                color={colorToken.brand.aeGreen}
                selectedColor={colorToken.brand.aeBlue}
                textColor={colorToken.greyPalette.white}
                onEntryClick={setActiveTab} />
            </Box>
            <Divider color='primary' orientation='vertical' flexItem />
            <Box sx={{ margin: 5, width: '100%', maxHeight: '100%', overflow: 'auto' }}>
              {drawSectors()}
            </Box>
          </Box>
        </DialogContent>
        <Divider color='primary' />
        <DialogActions>
          <Button variant='contained' onClick={handleSubmit} disabled={submitDisabled}>Add Selected Sectors</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SectorSelection;