import { useEffect, useState, useRef } from 'react';
import { Button, Divider, IconButton, Dialog, DialogTitle, DialogContent, Snackbar, Alert, Grid, Box, Typography} from '@mui/material';
import { Close } from '@mui/icons-material';
import SideBarTabs from '../components/SideBarTabs'
import TextBox from '../components/TextBox/TextBox';
import ExperienceTextBox from '../components/TextBox/ExperienceTextBox';


/**
 * Select Sector popup
 * @param resumeName name of associated resume we are selecting
 * @param open Boolean for if dialog is open
 * @param onClose Handler for when dialog should be closed
 * @param entires an array of objects contiaining sector entries in the form of {type:, sectors:[{key:,data:},...{}]}
 * @returns SelectSectorPopUp
 */
function SectorSelection({resumeName, open, onClose, entries}){

  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [selectedTab, setSelectedTab] = useState('');
  const [selectedEntries, setSelectedEntries] = useState([]); //contaning {type:, key:, data:}
  const [savedEntries, setSavedEntries] = useState([]); //contaning {type:, key:, data:}

  const checkIfTypeSaved = (type) => {
    const filtered = savedEntries.filter(entry => entry.type === type);
    return filtered.length > 0;
  }

  const handleClose = (success) => {
    setSubmitDisabled(true);
    onClose(success, selectedEntries);
    setSelectedEntries([]);
    setSelectedTab('');
  }

  const tabSelected = (name) => {
    setSelectedTab(name);
  }

  const handleSubmit = (ev) => {

    // TODO - display complete message based on submit success status
    setOpenCompleteMessage(true);
    handleClose(true);
  }

  const checkIfSaveDisabled= (type) => {
    return false;
  }

  const drawSectors = () => {
    return(
      entries.map(entry =>{
        if(entry.type === selectedTab){
          return(
            <Box key={`container${entry.type}`}>
              <Box key={`titlecontainer${entry.type}`} sx={{mb: 2, display: 'flex', flexDirection: 'row' }}>
                <Box sx={{flexGrow: 1}}>
                  <Typography variant="h1">{entry.type}</Typography>
                </Box>                
                <Button variant='contained' onClick={()=>{}} disabled={checkIfSaveDisabled(entry.type)}>Save</Button>
              </Box>
              {
                entry.sectors.map(sector =>{
                  if(entry.type === 'Experience'){
                    return(<Box key={`box_${sector.key}`} sx={{mb:5}}>
                    <ExperienceTextBox hideEdit={true} key={sector.key} description={sector.data.description} imageLink={sector.data.imageLink} division={sector.data.division} location={sector.data.location} name={sector.data.name}></ExperienceTextBox>
                  </Box>);
                  }else{
                    return (
                      <Box key={`box_${sector.key}`} sx={{mb:5}}>
                        <TextBox hideEdit={true} key={sector.key} text={sector.data}></TextBox>
                      </Box>
                    );
                  }
                })
              }
            </Box>
          );
        }
      })
    )
  }

  useEffect(()=>{
    for(let i = 0; i < entries.length; i++){
      if(!checkIfTypeSaved(entries[i].type)){
        setSubmitDisabled(true);
        return;
      }
    }
    setSubmitDisabled(false);
  });

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
        <DialogContent>
          <Box sx={{display: 'flex', flexDirection: 'row' }}>
            <Box sx={{width:300, height:400}}>
              <SideBarTabs entries={entries.map(ent =>{return({name: ent.type, error: !checkIfTypeSaved(ent.type)})})} 
              showCheckBoxes={false} color='#87C34B' selectedColor='#00569C' textColor='white' onEntryClick={(name)=>{tabSelected(name)}}></SideBarTabs>
            </Box>
            <Divider color='primary' orientation="vertical" flexItem />
            <Box sx={{margin: 5, width: '100%', maxHeight: '100%', overflow: 'auto'}}>
              {
                drawSectors()
              }
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
    
  );
}

export default SectorSelection;