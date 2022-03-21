import { useEffect, useState } from 'react';
import { Button, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import SideBarTabs from '../components/SideBarTabs'
import TextBox from '../components/TextBox/TextBox';
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

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setErrorStatus(false);
      axios.get('/Facade/GetResumesForEmployee', {
        params: {
          EID: eid,
        }
      }).then((response) => {
        setResumes(response.data);
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
        setErrorStatus(error.response);
      });
    }
  }, [open]);

  const handleClose = (success) => {
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
          <div><Typography variant='h2'>{employeeName}</Typography></div>
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => { handleClose(false); }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider color='primary' />
        <DialogContent style={{ height: '600px', padding: '0px 0px 0px 0px' }}>
          {isLoading && <Loading text='Loading Resumes...' />}
          {!isLoading && errorStatus && <Error text='Error retrieving resumes.' response={errorStatus}></Error>}
          {!isLoading && !errorStatus &&
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <Box sx={{ width: 300, height: '600px' }}>
                <SideBarTabs
                  entries={resumes}
                  showCheckBoxes={false}
                  color={colorToken.brand.aeGreen}
                  selectedColor={colorToken.brand.aeBlue}
                  textColor={colorToken.greyPalette.white}
                  onEntryClick={(tabNum) => {handleResumeClicked(tabNum)}} />
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
                        <Box mb={5} key={sector.id}>
                          <TextBox key={sector.id} id={sector.id} text={sector.content} footer={`Date Edited: ${sector.lastEditedDate}`} hideEdit />
                        </Box>);
                      })
                    }
                  </Box>);
                })}
              </Box>
            </Box>
          }
        </DialogContent>
        <Divider color='primary' />
        <DialogActions>
          {
            submittable && <Button variant='contained' onClick={() => { handleSubmit() }} disabled={false}>Copy Selected Resume</Button>
          }
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ResumeSelection;
