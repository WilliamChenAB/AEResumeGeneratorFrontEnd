import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userSelectors } from '../../slices/userSlice';
import SideBar from '../../containers/SideBar';
import AddButton from '../../components/AddButton';
import ExperienceTextBox from '../../components/TextBox/ExperienceTextBox';
import SectorSelection from '../../containers/SectorSelection';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import AlertPopup from '../../components/AlertPopup';
import ConfirmDelete from '../../containers/ConfirmDelete';
import ChooseSectorTypes from '../../containers/ChooseSectorTypes';
import axios from 'axios';
import SortButton from '../../components/SortButton';

function Resume() {
  let { resumeId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showSectorSelectionDialog, setShowSectorSelectionDialog] = useState(false);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [sectorTypes, setSectorTypes] = useState([]);
  const [resumeName, setResumeName] = useState('');
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteSectorId, setDeleteSectorId] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showChooseSectorTypeDialog, setShowChooseSectorTypeDialog] = useState(false);
  const [sortState, setSortState] = useState(0);

  const userName = useSelector(userSelectors.getName);
  const userTitle = useSelector(userSelectors.getTitle);

  const getResume = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Facade/GetResume', {
      params: {
        RID: resumeId,
      }
    }).then((resumeResponse) => {
      axios.get('/Admin/GetSectorsInTemplate', {
        params: {
          templateID: resumeResponse.data.templateID,
        }
      }).then((templateResponse) => {
        setResumeName(resumeResponse.data.name || 'untitled');
        const typesTemplate = templateResponse.data.map((type) => {
          return {
            id: type.typeID,
            name: type.title || 'untitled',
            template: true,
            error: true,
          };
        });
        const typesResume = resumeResponse.data.sectorList.map((sector) => {
          return {
            id: sector.typeID,
            name: sector.typeTitle || 'untitled',
            template: false,
            error: false,
          };
        });
        let typesUnique = [...typesTemplate]
        for (const typeResume of typesResume) {
          let found = typesUnique.find(type => type.id === typeResume.id);
          if (found) {
            found.error = false;
          } else {
            typesUnique.push(typeResume);
          }
        }
        setSectorTypes(typesUnique);
        setSectors(resumeResponse.data.sectorList.map((sector) => {
          return {
            id: sector.sid,
            createDate: sector.creationDate,
            updateDate: sector.lastEditedDate,
            content: sector.content,
            division: sector.division,
            image: sector.image,
            type: sector.typeID,
          }
        }));
        if(typesUnique[activeTab] === null || typesUnique[activeTab] === undefined){
          setActiveTab(0);
        }
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
        setErrorStatus(error.response);
      });
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  useEffect(() => {
    getResume();
  }, []);

  const addNewBlankSector = () => {
    setIsLoading(true);
    axios.post('/Facade/AddSectorToResume', null, {
      params: {
        RID: resumeId,
        content: '',
        typeID: sectorTypes[activeTab]?.id,
        division: '',
        image: '',
      }
    }).then((response) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `A blank sector for ${sectorTypes[activeTab]?.name} has been successfully created.`
      });
      getResume();
    }).catch((error) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while creating blank sector. (${error.response.status} ${error.response.statusText})`
      });
    });
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
      getResume();
    }).catch((error) => {
      setIsDeleting(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while deleting sector. (${error.response.status} ${error.response.statusText})`
      });
      setShowDeleteDialog(false);
    });
  };

  const handleDeleteSectorClick = (sectorId) => {
    setDeleteSectorId(sectorId);
    setShowDeleteDialog(true);
  }

  const handleSectorSelectionSubmit = (selectedSectors) => {
    const requests = selectedSectors.map(sector =>
      axios.post('/Facade/AddSectorToResume', null, {
        params: {
          RID: resumeId,
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
      getResume();
    }).catch((error) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while copying one or more of the sectors. (${error.response.status} ${error.response.statusText})`
      });
    });
  }


  const sorting = (a,b) => {
    if(sortState === 1){
      return a.updateDate < b.updateDate? 1 : -1;
    }
    else if(sortState === 2){
      return b.updateDate < a.updateDate? 1 : -1;
    }
    else {
      return 0;
    }
  }

  const handleSectorTypeSelectionSubmit = (selectedTypes) => {
    const requests = selectedTypes.map(type =>
      axios.post('/Facade/AddSectorToResume', null, {
        params: {
          RID: resumeId,
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
      getResume();
    }).catch((error) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while creating one or more sectors for sector types. (${error.response.status} ${error.response.statusText})`
      });
    });
  }

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={() => { setOpenCompleteMessage(false) }}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      <SectorSelection title={`${sectorTypes[activeTab]?.name} Sectors`} open={showSectorSelectionDialog} onClose={() => { setShowSectorSelectionDialog(false) }} onSubmit={(sectors) => { handleSectorSelectionSubmit(sectors) }} singleSectorTypeObj={sectorTypes[activeTab]} />
      <ConfirmDelete nameToDelete={`the sector from this resume`} open={showDeleteDialog} onClose={() => { setShowDeleteDialog(false) }} onConfirm={() => { deleteSector() }} isDeleting={isDeleting} />
      <ChooseSectorTypes open={showChooseSectorTypeDialog} onSubmit={(types) => { handleSectorTypeSelectionSubmit(types) }} onClose={() => { setShowChooseSectorTypeDialog(false) }} />
      <Box>
        <SideBar title={userName} subtitle={userTitle} entries={sectorTypes} setTab={setActiveTab} color='primary' useButton buttonText='Add Sector Types' buttonClick={() => { setShowChooseSectorTypeDialog(true) }} selected={activeTab}/>
      </Box>
      <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
        {isLoading && <Loading text='Loading Resume...' />}
        {!isLoading && errorStatus && <Error text='Error retrieving resume.' response={errorStatus}></Error>}
        {!isLoading && !errorStatus &&
          <>
            <Link to='/employee/resumes' style={{ textDecoration: 'none' }}>
              <Button startIcon={<ArrowBack />}>Back to Resumes</Button>
            </Link>
            <br />
            <br />
            <Typography variant='subtitle2'>{resumeName}</Typography>
            <br />
            {sectorTypes.length > 0 &&
              <>
                <Typography variant='h3'>{sectorTypes[activeTab]?.name.toUpperCase()} SECTORS</Typography>
                <br />
                <AddButton text='Add Blank Sector' onClick={() => { addNewBlankSector() }} />
                <AddButton text='Duplicate Previous Sector' onClick={() => { setShowSectorSelectionDialog(true) }} />
                <Box sx={{pb:1, pr: 5, display:'flex', justifyContent:'flex-end'}}>
                  <SortButton text='Sort: Last_Updated' sortState={sortState} onClick={() => {setSortState((sortState + 1) % 3)}}/>
                </Box>
                {sectors.filter((sector) => {
                   return sector.type === sectorTypes[activeTab]?.id;
                }).sort(sorting).map((sector) =>{
                  return(
                    <Box mb={5} key={sector.id}>
                      <ExperienceTextBox imageLinkIn={sector.image} divisionIn={sector.division} key={sector.id} sid={sector.id} text={sector.content} onDelete={() => { handleDeleteSectorClick(sector.id) }} footer={`Last Updated: ${sector.updateDate}`} />
                    </Box>)
                })}
              </>
            }
            {sectorTypes.length === 0 &&
              <Typography variant='body1'>To begin constructing your resume, click the Add Sector button on the bottom left.</Typography>
            }
          </>
        }
      </Box>
    </Box>
  )
}

export default Resume;