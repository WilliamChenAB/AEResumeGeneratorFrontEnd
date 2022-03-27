import { useEffect, useState } from 'react';
import { Button, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import SideBarTabs from '../components/SideBarTabs'
import SearchBar from '../components/SearchBar';
import ExperienceTextBox from '../components/TextBox/ExperienceTextBox';
import { colorToken } from '../theme/colorToken';
import Loading from '../components/Loading';
import Error from '../components/Error';
import axios from 'axios';

/**
 * Select Sector popup
 * @param employeeName name of associated resume we are selecting
 * @param open Boolean for if dialog is open
 * @param onClose Handler for when dialog should be closed
 * @param onSubmit Handler for when submit button is clicked
 * @param eid eid used
 * @param submittable wether submit button is visible
 * @returns SelectSectorPopUp
 */
function ResumeSelection({ employeeName, open, eid ,onClose, onSubmit, submittable=true}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingResume, setIsLoadingReusme] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [resumes, setResumes] = useState([]);
  const [currentSectors, setCurrentSectors] = useState([]);
  const [search, setSearch] = useState('');

  const searchResumes = () => {
    if(search !== ''){
      setIsLoading(true);
      setErrorStatus(false);
      axios.get('/Facade/SearchAllEmployeeResumes', {
        params: {
          filter: search,
          EID: eid,
        }
      }).then((response) => {
        setResumes(response.data);
        if(resumes.length > 0){
          handleResumeClicked(0);
        }
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
        setErrorStatus(error.response);
      });
    }
  }

  const getResumes = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Facade/GetResumesForEmployee', {
      params: {
        EID: eid,
      }
    }).then((response) => {
      setResumes(response.data);
      if(resumes.length > 0){
        handleResumeClicked(0);
      }
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  useEffect(() => {
    if (open) {
      getResumes();
    }
  }, [open]);

  const handleClose = (success) => {
    setSearch('');
    setSubmitDisabled(true);
    setCurrentSectors([]);
    onClose(success);
  }


  const handleResumeClicked = (tabNum) => {
    setActiveTab(tabNum);
    setIsLoadingReusme(true);
      setErrorStatus(false);
      axios.get('/Facade/GetResume', {
        params: {
          RID: resumes[tabNum].rid,
        }
      }).then((response) => {
        setCurrentSectors(response.data.sectorList);
        setIsLoadingReusme(false);
      }).catch((error) => {
        setIsLoadingReusme(false);
        setErrorStatus(error.response);
      });
  }

  const getActiveResumeSectorTypes = () => {
    let types = [];
    currentSectors.map((sector) => {
      if(types.filter((entry) => entry===sector.typeTitle).length === 0){
        types.push(sector.typeTitle);
      }
    });
    return types;
  }

  const handleSubmit = (ev) => {
    onSubmit(resumes[activeTab]?.rid);
    handleClose(true);
  }

  return (
    <div>
      <Dialog fullWidth maxWidth='lg' open={open}>
        <DialogTitle>
          <div><Typography variant='h2'>{`Resumes: ${employeeName}`}</Typography></div>
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => { handleClose(false); }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <Box sx={{pb:1, pl:2, display:'flex', flexDirection: 'row'}}>
            <Box sx={{ width: '50%' }}>
              <SearchBar defaultValue='' placeholder='Search Resumes' onChange={(value) => {setSearch(value)}}></SearchBar>
            </Box>
          <Box sx={{pl:2, width:'20%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button variant="contained" onClick={searchResumes}>Search</Button>
            <Button variant="contained" onClick={() => {getResumes()}}>Clear</Button>
          </Box>
        </Box>
        <Divider color='primary' />
        <DialogContent style={{ height: '600px', padding: '0px 0px 0px 0px' }}>
          {isLoading && <Loading text='Loading Resumes...' />}
          {!isLoading && errorStatus && <Error text='Error retrieving resumes.' response={errorStatus}></Error>}
          {!isLoading && !errorStatus &&
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box sx={{ width: 300, height: '600px', display: 'flex', flexDirection: 'column'}}>
                <SideBarTabs
                  entries={resumes}
                  showCheckBoxes={false}
                  color={colorToken.brand.aeBlueLight}
                  selectedColor={colorToken.brand.aeBlueMid}
                  textColor={colorToken.greyPalette.aeBlue}
                  onEntryClick={(tabNum) => {handleResumeClicked(tabNum)}}
                  selected={activeTab} />
              </Box>
              <Divider color='primary' orientation='vertical' flexItem />
              <Box sx={{ ml: 5, mr: 5, mt: 2, width: '100%', maxHeight: '100%', overflow: 'auto' }}>
                {isLoadingResume && <Loading text={`Loading Resume ${resumes[activeTab]?.name}...`} />}
                {!isLoading && getActiveResumeSectorTypes().map((sectorTypeName) => {
                  return(
                  <Box key={sectorTypeName}>
                    <Typography key={sectorTypeName} color='primary' variant='h2'>{sectorTypeName}</Typography>
                    {
                      currentSectors.filter((sector) => sector.typeTitle === sectorTypeName).map((sector) => {
                        return( 
                        <Box mb={5} key={`box_${sector.sid}`}>
                          <ExperienceTextBox imageLinkIn={sector.image} divisionIn={sector.division} key={sector.sid} sid={sector.sid} text={sector.content} footer={`Date Edited: ${sector.lastEditedDate}`} hideEdit />
                        </Box>);
                      })
                    }
                  </Box>);
                })}
              </Box>
            </Box>
          }
        </DialogContent>
        {
          submittable &&
          <>
            <Divider color='primary' />
            <DialogActions>
              <Button variant='contained' onClick={() => { handleSubmit() }} disabled={false}>Copy Selected Resume</Button>
            </DialogActions>
          </>
        }
        
      </Dialog>
    </div>
  );
}

export default ResumeSelection;
