import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ConfirmDelete from '../../containers/ConfirmDelete';
import SectorSelection from '../../containers/SectorSelection';
import ExperienceTextBox from '../../components/TextBox/ExperienceTextBox';
import { Box, Button, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import AddButton from '../../components/AddButton';
import SideBar from '../../containers/SideBar';
import ChooseSectorTypes from '../../containers/ChooseSectorTypes';
import AddEmployee from '../../containers/AddEmployee';
import ErrorOutlineOutlined from '@mui/icons-material/ErrorOutlineOutlined';
import AlertPopup from '../../components/AlertPopup';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import axios from 'axios';

// Object.filter = function (obj, predicate) {
//   let result = {}, key;

//   return result;
// };

function EditWorkspace() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [activeEmployeeTab, setActiveEmployeeTab] = useState(0);
  const [activeSectorTypeTab, setActiveSectorTypeTab] = useState(0);
  const [openAddEmployee, setOpenAddEmployee] = useState(false);
  const [showSelectionDialog, setShowSelectionDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteSectorId, setDeleteSectorId] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [workSpace, setWorkspace] = useState({});
  const [entries, setEntries] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [workSpaceName, setWorkSpaceName] = useState('');
  const [showChooseSectorTypeDialog, setShowChooseSectorTypeDialog] = useState(false);


  let { workspaceId } = useParams();

  const getWorkspace = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Attributes/GetWorkspace', {
      params: {
        WID: workspaceId,
      }
    }).then((response) => {
      setWorkSpaceName(response.data.name);
      setWorkspace(
        {
          name: response.data.name, //use actual name
          proposalNumber: response.data.proposalNumber,
          division: response.data.division,
          creationDate: response.data.creationDate
        }
      );
      setEntries(
        response.data.resumes.map((resume) => {
          return ({
            name: String(resume.name), error: false
          });
        })
      );
      setResumes(response.data.resumes);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  // Get resume
  useEffect(() => {
    getWorkspace();
  }, []);

  const addNewBlankSector = (rid) => {
    setIsLoading(true);
    const entries = getResumeEntries();
    const typeId = entries[activeSectorTypeTab].id;
    axios.post('/Facade/AddSectorToResume', null, {
      params: {
        RID: rid,
        content: '',
        typeID: typeId,
        division: '',
        image: '',
      }
    }).then((response) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `A blank sector has been successfully created.`
      });
      getWorkspace();
    }).catch((error) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while creating blank sector. (${error.response.status} ${error.response.statusText})`
      });
      getWorkspace();
    });
  }

  const handleDeleteSectorClick = (sectorId) => {
    setDeleteSectorId(sectorId);
    setShowDeleteDialog(true);
  }

  const deleteSector = () => {
    setIsDeleting(true);
    axios.delete('/Facade/DeleteSector', {
      params: {
        SID: deleteSectorId,
      }
    }).then((response) => {
      setIsDeleting(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Sector has been permanently deleted.`
      });
      setShowDeleteDialog(false);
      setActiveSectorTypeTab(-1);
      getWorkspace();
    }).catch((error) => {
      setIsDeleting(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while deleting sector. (${error.response.status} ${error.response.statusText})`
      });
      setShowDeleteDialog(false);
      setActiveSectorTypeTab(-1);
    });
  };

  const handleSectorSelectionSubmit = (selectedSectors) => {
    let requests = selectedSectors.map(sector =>
      axios.post('/Facade/AddSectorToResume', null, {
        params: {
          RID: resumes[activeEmployeeTab].rid,
          content: sector.content,
          typeID: sector.type,
          division: sector.division,
          image: sector.image,
        }
      }));

    setIsLoading(true);
    Promise.all(requests).then((results) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Sectors have been successfully copied.`
      });
      getWorkspace();
    }).catch((error) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while copying one or more of the sectors. (${error.response.status} ${error.response.statusText})`
      });
    });
  }

  const getResumeEntries = () => {
    if (activeEmployeeTab === -1) {
      return null;
    }
    const resume = resumes[activeEmployeeTab];
    if (resume !== undefined) {

      let retArray = [];
      resume.sectorList.map((sector) => {
        if (retArray.filter(entry => entry.name === sector.typeTitle).length === 0) {
          retArray.push({ name: sector.typeTitle, error: false, id: sector.typeID });
        }
      });

      //TODO: add templates here
      return retArray;
    }
    return null;
  };

  const handleSectorTypeSelectionSubmit = (selectedTypes) => {
    const requests = selectedTypes.map(type =>
      axios.post('/Facade/AddSectorToResume', null, {
        params: {
          RID: resumes[activeEmployeeTab].rid,
          content: '',
          typeID: type.id,
        }
      }));

    setIsLoading(true);
    Promise.all(requests).then((results) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Sectors have been successfully created.`
      });
      getWorkspace();
    }).catch((error) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while creating one or more sectors for sector types. (${error.response.status} ${error.response.statusText})`
      });
    });
  }

  const drawSectors = () => {
    if (activeEmployeeTab === -1) {
      return null;
    }

    const resume = resumes[activeEmployeeTab];
    if (resume === undefined || resume === null) {
      return null;
    }
    const requested = resume.status !== 0 ? true : false;

    if (requested) {
      return (
        <Box sx={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
          <Box sx={{ border: 1, borderRadius: 2, borderColor: 'red', padding: 2, width: 300, height: 80 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <ErrorOutlineOutlined sx={{ fontSize: 30, color: 'red' }} />
              <Box sx={{ mt: 0, ml: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography color='brown' variant='h2'>Resume Pending</Typography>
                <br />
                <Typography color='brown'>Will be uploaded once available</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      );
    } else {
      const entries = getResumeEntries();
      if(entries.length <= 0){
        return null;
      }
      const sectorName = entries[activeSectorTypeTab].name;

      const sectors = resume.sectorList.filter(sector => sector.typeTitle === sectorName);
      if (sectors.length === 0) {
        return (
          <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
            <Box mb={4}>
              <Typography variant='h3'>{sectorName.toUpperCase()}</Typography>
              <br />
              <br />
              <AddButton onClick={() => { addNewBlankSector(resume.rid) }} text="Add Blank Sector" />
              <AddButton text='Duplicate Previous Sector' onClick={() => { setShowSelectionDialog(true) }} />
            </Box>
          </Box>
        );
      }
      return (
        <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
          <Box mb={4}>
            <Typography variant='h3'>{sectorName.toUpperCase()}</Typography>
            <br />
            <br />
            <AddButton onClick={() => { addNewBlankSector(resume.rid) }} text="Add Blank Sector" />
            <AddButton text='Duplicate Previous Sector' onClick={() => { setShowSelectionDialog(true) }} />
          </Box>
          {sectors.map((sector) => { return (<Box mb={5} key={sector.sid}><ExperienceTextBox key={sector.sid} imageLinkIn={sector.image} divisionIn={sector.division} sid={sector.sid} text={sector.content} onDelete={() => { handleDeleteSectorClick(sector.sid) }} footer={`Last Updated: ${sector.lastEditedDate}`} /></Box>) })}
        </Box>
      );
    }
  }

  return (
    <>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={() => { setOpenCompleteMessage(false) }}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      <ConfirmDelete nameToDelete={`the sector from this resume`} open={showDeleteDialog} onClose={() => { setShowDeleteDialog(false) }} onConfirm={() => { deleteSector() }} isDeleting={isDeleting} />
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%'}}>
        {isLoading && <Box sx={{flexGrow:1, height: '100%', widht: '100%'}}><Loading text='Loading Workspace...' /></Box>}
        {!isLoading && errorStatus && <Error text='Error retrieving resume.' response={errorStatus}></Error>}
        {!isLoading && !errorStatus &&
          <>
            <SideBar title={workSpaceName} entries={entries} setTab={(index) => { setActiveEmployeeTab(index); setActiveSectorTypeTab(0) }} subtitle='' color='primary' useButton={true} buttonText='Add Employee' buttonClick={() => { setOpenAddEmployee(true) }} />
            {
              activeEmployeeTab !== -1 && workSpace && entries[activeEmployeeTab] && <SideBar title={entries[activeEmployeeTab].name} color='secondary' setTab={setActiveSectorTypeTab} useButton={true} buttonText='Add Sector Type' buttonClick={() => { setShowChooseSectorTypeDialog(true) }} entries={getResumeEntries()}></SideBar>
            }
            <Box sx={{width: '100%'}}>
              <Box sx={{margin:2}}>
                <Link to='/project/workspaces' style={{ textDecoration: 'none' }}>
                  <Button startIcon={<ArrowBack />}>Back to Workspaces</Button>
                </Link>
              </Box>
              {
                activeEmployeeTab !== -1 && workSpace && entries[activeEmployeeTab] && activeSectorTypeTab !== -1 && drawSectors()
              }
            </Box>
          </>
        }
      </Box>
      <ChooseSectorTypes open={showChooseSectorTypeDialog} onSubmit={(types) => { handleSectorTypeSelectionSubmit(types) }} onClose={() => { setShowChooseSectorTypeDialog(false) }} />
      <AddEmployee wname={workSpaceName} wid={workspaceId} open={openAddEmployee} onClose={() => { setOpenAddEmployee(false); getWorkspace(); }}></AddEmployee>
      {
        activeEmployeeTab !== -1 && workSpace && <SectorSelection title={`${getResumeEntries()? getResumeEntries()[activeSectorTypeTab]?.name : ''} Sectors`} open={showSelectionDialog} onClose={() => { setShowSelectionDialog(false) }} onSubmit={(sectors) => { handleSectorSelectionSubmit(sectors) }} singleSectorTypeObj={getResumeEntries()? getResumeEntries()[activeSectorTypeTab]: null}/>
      }

    </>
  );
}

export default EditWorkspace;