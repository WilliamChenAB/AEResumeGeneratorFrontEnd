import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';
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
import ConfirmResumeSubmit from '../../containers/ConfirmResumeSubmit';
import Divider from '@mui/material/Divider';
import { formatToLocalTime } from '../../utils/DateTime';

function Resume() {
  const { resumeId } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [showSectorSelectionDialog, setShowSectorSelectionDialog] = useState(false);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [sectorTypes, setSectorTypes] = useState([]);
  const [resumeDetails, setResumeDetails] = useState({});
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteSectorId, setDeleteSectorId] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showChooseSectorTypeDialog, setShowChooseSectorTypeDialog] = useState(false);
  const [sortState, setSortState] = useState(0);
  const [showSubmitConfirmDialog, setShowSubmitConfirmDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userName = useSelector(userSelectors.getName);
  const userTitle = useSelector(userSelectors.getTitle);

  const getResume = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Resume/Get', {
      params: {
        resumeId: resumeId,
      }
    }).then((resumeResponse) => {
      axios.get('/Template/GetSectors', {
        params: {
          templateId: resumeResponse.data.templateId,
        }
      }).then((templateResponse) => {
        setResumeDetails({
          name: resumeResponse.data.name || 'untitled',
          status: resumeResponse.data.status,
          workspaceId: resumeResponse.data.workspaceId,
          templateId: resumeResponse.data.templateId,
          createdDate: resumeResponse.data.creationDate,
          updatedDate: resumeResponse.data.lastEditedDate,
        });
        const typesTemplate = templateResponse.data.map((type) => {
          return {
            id: type.typeId,
            name: type.title || 'untitled',
            template: true,
            error: true,
          };
        });
        const typesResume = resumeResponse.data.sectorList.map((sector) => {
          return {
            id: sector.typeId,
            name: sector.typeTitle || 'untitled',
            template: false,
            error: false,
            content: sector.content
          };
        });
        let typesUnique = [...typesTemplate]
        for (const typeResume of typesResume) {
          const foundErr = typesUnique.find(type => (type.id === typeResume.id && typeResume.content !== ''));
          let found = typesUnique.find(type => type.id === typeResume.id);
          if (found) {
            foundErr ? found.error = false : found.error = true;
          } else {
            typesUnique.push(typeResume);
          }
        }
        setSectorTypes(typesUnique);
        setSectors(resumeResponse.data.sectorList.map((sector) => {
          return {
            id: sector.sectorId,
            createDate: sector.creationDate,
            updateDate: sector.lastEditedDate,
            content: sector.content,
            division: sector.division,
            image: sector.image,
            type: sector.typeId,
          }
        }));
        if (typesUnique[activeTab] === null || typesUnique[activeTab] === undefined) {
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
    axios.post('/Sector/AddToResume', null, {
      params: {
        resumeId: resumeId,
        content: '',
        typeId: sectorTypes[activeTab]?.id,
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
    axios.delete('/Sector/Delete', {
      params: {
        sectorId: deleteSectorId,
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

  const editSector = (sectorId, newDivision, newImageLink, newDescription) => {
    setIsLoading(true);
    axios.put('/Sector/Edit', null, {
      params: {
        sectorId: sectorId,
        content: newDescription,
        division: newDivision || '',
        image: newImageLink || '',
      }
    }).then((response) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Sector has been successfully edited.`
      });
      getResume();
    }).catch((error) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while editing sector. (${error.response.status} ${error.response.statusText})`
      });
    });
  }

  const handleDeleteSectorClick = (sectorId) => {
    setDeleteSectorId(sectorId);
    setShowDeleteDialog(true);
  }

  const handleSectorSelectionSubmit = (selectedSectors) => {
    const requests = selectedSectors.map(sector =>
      axios.post('/Sector/AddToResume', null, {
        params: {
          resumeId: resumeId,
          content: sector.content,
          typeId: sector.type,
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

  const sorting = (a, b) => {
    if (sortState === 1) {
      return a.updateDate < b.updateDate ? 1 : -1;
    }
    else if (sortState === 2) {
      return b.updateDate < a.updateDate ? 1 : -1;
    }
    else {
      return 0;
    }
  }

  const handleSectorTypeSelectionSubmit = (selectedTypes) => {
    const requests = selectedTypes.map(type =>
      axios.post('/Sector/AddToResume', null, {
        params: {
          resumeId: resumeId,
          content: '',
          typeId: type.id,
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

  const handleSubmitResume = () => {
    setIsSubmitting(true);
    axios.post('/Workspace/SubmitResume', null, {
      params: {
        resumeId: resumeId,
        workspaceId: resumeDetails.workspaceId,
      }
    }).then((response) => {
      setIsSubmitting(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Resume ${resumeDetails.name} has been successfully submitted.`
      });
      navigate('/employee/resumes');
    }).catch((error) => {
      setIsSubmitting(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while submitting resume. (${error.response.status} ${error.response.statusText})`
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
      {isLoading && <Box sx={{ width: '100%' }}><Loading text='Loading Resume...' /></Box>}
      {!isLoading && errorStatus && <Box sx={{ width: '100%' }}><Error text='Error retrieving resume.' response={errorStatus} /></Box>}
      {!isLoading && !errorStatus &&
        <>
          <Box>
            <SideBar title={userName} subtitle={userTitle} entries={sectorTypes} setTab={setActiveTab} color='primary' useButton buttonText='Add Types To Resume' buttonClick={() => { setShowChooseSectorTypeDialog(true) }} selected={activeTab} />
          </Box>
          <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='h3'>{resumeDetails.name}</Typography>
              <Link to='/employee/resumes' style={{ textDecoration: 'none' }}>
                <Button endIcon={<ArrowForward />}>Back to Resumes</Button>
              </Link>
            </Box>
            <Divider />
            <br />
            <br />
            <br />
            {sectorTypes.length > 0 &&
              <>
                <Typography variant='h3'>{sectorTypes[activeTab]?.name.toUpperCase()} SECTORS</Typography>
                <br />
                <AddButton text='Add Blank Sector' onClick={() => { addNewBlankSector() }} />
                <AddButton text='Duplicate Previous Sector' onClick={() => { setShowSectorSelectionDialog(true) }} />
                <Box sx={{ pb: 1, pr: 5, display: 'flex', justifyContent: 'flex-end' }}>
                  <SortButton sortName='Last Updated' sortState={sortState} onClick={() => { setSortState((sortState + 1) % 3) }} />
                </Box>
                {sectors.filter((sector) => {
                  return sector.type === sectorTypes[activeTab]?.id;
                }).sort(sorting).map((sector) => {
                  return (
                    <Box mb={5} key={sector.id}>
                      <ExperienceTextBox
                        imageLinkIn={sector.image}
                        divisionIn={sector.division}
                        key={sector.id}
                        sectorId={sector.id}
                        text={sector.content}
                        onDelete={() => { handleDeleteSectorClick(sector.id) }}
                        footer={`Last Updated: ${formatToLocalTime(sector.updateDate)}`}
                        onEdit={(sectorId, newDivision, newImageLink, newDescription) => { editSector(sectorId, newDivision, newImageLink, newDescription) }} />
                    </Box>)
                })}
              </>
            }
            {sectorTypes.length === 0 &&
              <Typography variant='body1'>To begin constructing your resume, click the Add Sector button on the bottom left.</Typography>
            }
            {resumeDetails.status === 1 &&
              <>
                <ConfirmResumeSubmit open={showSubmitConfirmDialog} resumeName={resumeDetails.name} onClose={() => { setShowSubmitConfirmDialog(false) }} onConfirm={() => { handleSubmitResume() }} isSubmitting={isSubmitting} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', position: 'fixed', bottom: 10, right: 10 }}>
                  <Button variant='contained' color='secondary' sx={{ color: 'white' }} onClick={() => { setShowSubmitConfirmDialog(true) }}>Submit Resume</Button>
                </Box>
              </>
            }
          </Box>
        </>
      }
    </Box>
  )
}

export default Resume;