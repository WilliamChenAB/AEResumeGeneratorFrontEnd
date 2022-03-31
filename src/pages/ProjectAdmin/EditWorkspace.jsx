import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ConfirmDelete from '../../containers/ConfirmDelete';
import SectorSelection from '../../containers/SectorSelection';
import ExperienceTextBox from '../../components/TextBox/ExperienceTextBox';
import { Box, Button, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import AddButton from '../../components/AddButton';
import SideBar from '../../containers/SideBar';
import ChooseSectorTypes from '../../containers/ChooseSectorTypes';
import AddEmployee from '../../containers/AddEmployee';
import SortButton from '../../components/SortButton';
import ErrorOutlineOutlined from '@mui/icons-material/ErrorOutlineOutlined';
import AlertPopup from '../../components/AlertPopup';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import axios from 'axios';
import Divider from '@mui/material/Divider';

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
  const [isDeletingResume, setIsDeletingResume] = useState(false);
  const [showDeleteDialogResume, setShowDeleteDialogResume] = useState(false);
  const [deleteResumeObj, setDeleteResumeObj] = useState({});
  const [workSpace, setWorkspace] = useState({});
  const [entries, setEntries] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [workSpaceName, setWorkSpaceName] = useState('');
  const [showChooseSectorTypeDialog, setShowChooseSectorTypeDialog] = useState(false);
  const [sortState, setSortState] = useState(0);

  let { workspaceId } = useParams();

  const sorting = (a, b) => {
    if (sortState === 1) {
      return a.lastEditedDate < b.lastEditedDate ? 1 : -1;
    }
    else if (sortState === 2) {
      return b.lastEditedDate < a.lastEditedDate ? 1 : -1;
    }
    else {
      return 0;
    }
  }

  const getWorkspace = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Workspace/Get', {
      params: {
        workspaceId: workspaceId,
      }
    }).then((response) => {
      setWorkSpaceName(response.data.name);
      setWorkspace(
        {
          name: response.data.name,
          proposalNumber: response.data.proposalNumber,
          division: response.data.division,
          creationDate: response.data.creationDate
        }
      );
      setEntries(
        response.data.resumes.map((resume) => {
          return ({
            name: String(resume.employeeName), error: false
          });
        })
      );
      setResumes(response.data.resumes);
      if (response.data.resumes[activeEmployeeTab] === null || response.data.resumes[activeEmployeeTab] === undefined) {
        setActiveEmployeeTab(0);
      }
      const requests = response.data.resumes.map(resume => {
        return (axios.get('/Template/GetSectors', {
          params: {
            templateId: resume.templateId,
          }
        }));
      });

      setIsLoading(true);
      Promise.all(requests).then((results) => {
        setIsLoading(false);
        setTemplates(results.map((res) => { return (res.data) }));
      }).catch((error) => {
        setIsLoading(false);
        setErrorStatus(error.response);
      });
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  // Get workspace
  useEffect(() => {
    getWorkspace();
  }, []);

  const addNewBlankSector = (resumeId) => {
    setIsLoading(true);
    const entries = getResumeEntries();
    const typeId = entries[activeSectorTypeTab].id;
    axios.post('/Sector/AddToResume', null, {
      params: {
        resumeId: resumeId,
        content: '',
        typeId: typeId,
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
      getWorkspace();
    }).catch((error) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while editing sector. (${error.response.status} ${error.response.statusText})`
      });
    });
  }

  const handleSectorSelectionSubmit = (selectedSectors) => {
    let requests = selectedSectors.map(sector =>
      axios.post('/Sector/AddToResume', null, {
        params: {
          resumeId: resumes[activeEmployeeTab].resumeId,
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
          retArray.push({ name: sector.typeTitle, error: true, id: sector.typeId});
        }
      });

      resume.sectorList.map((sector) => {
        let found = retArray.find(entry => entry.id === sector.typeId && sector.content !== '');
        if(found){
          found.error = false;
        }
      })

      const template = templates[activeEmployeeTab];
      if (template !== undefined && template !== null) {
        template.map((sector) => {
          const filtered = retArray.filter(entry => entry.id === sector.typeId);
          if (filtered.length === 0) {
            retArray.push({ name: sector.title, error: true, id: sector.typeId });
          }
        });
      }
      return retArray;
    }
    return null;
  };

  const handleSectorTypeSelectionSubmit = (selectedTypes) => {
    const requests = selectedTypes.map(type =>
      axios.post('/Sector/AddToResume', null, {
        params: {
          resumeId: resumes[activeEmployeeTab].resumeId,
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
      getWorkspace();
    }).catch((error) => {
      setIsLoading(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while creating one or more sectors for sector types. (${error.response.status} ${error.response.statusText})`
      });
    });
  }

  const deleteResume = () => {
    setIsDeletingResume(true);
    axios.delete('/Resume/Delete', {
      params: {
        resumeId: deleteResumeObj.resumeId,
      }
    }).then((response) => {
      setIsDeletingResume(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Resume ${deleteResumeObj.name} has been permanently deleted.`
      });
      setShowDeleteDialogResume(false);
      getWorkspace();
    }).catch((error) => {
      setShowDeleteDialogResume(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while deleting resume. (${error.response.status} ${error.response.statusText})`
      });
      setShowDeleteDialog(false);
    });
  };

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
      if (entries.length <= 0) {
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
              <AddButton onClick={() => { addNewBlankSector(resume.resumeId) }} text='Add Blank Sector' />
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
            <AddButton onClick={() => { addNewBlankSector(resume.resumeId) }} text='Add Blank Sector' />
            <AddButton text='Duplicate Previous Sector' onClick={() => { setShowSelectionDialog(true) }} />
            <Box sx={{ pb: 1, pr: 5, display: 'flex', justifyContent: 'flex-end' }}>
              <SortButton sortName='Last Updated' sortState={sortState} onClick={() => { setSortState((sortState + 1) % 3) }} />
            </Box>
          </Box>
          {sectors.sort(sorting).map((sector) => {
            return (
              <Box mb={5} key={sector.sectorId}>
                <ExperienceTextBox
                  key={sector.sectorId}
                  imageLinkIn={sector.image}
                  divisionIn={sector.division}
                  sectorId={sector.sectorId}
                  text={sector.content}
                  onDelete={() => { handleDeleteSectorClick(sector.sectorId) }}
                  footer={`Last Updated: ${sector.lastEditedDate}`}
                  onEdit={(sectorId, newDivision, newImageLink, newDescription) => { editSector(sectorId, newDivision, newImageLink, newDescription) }} />
              </Box>
            )
          })}
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
      <ConfirmDelete nameToDelete='the sector from this resume' open={showDeleteDialog} onClose={() => { setShowDeleteDialog(false) }} onConfirm={() => { deleteSector() }} isDeleting={isDeleting} />
      <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%', width: '100%' }}>
        {isLoading && <Box sx={{ flexGrow: 1, height: '100%', widht: '100%' }}><Loading text='Loading Workspace...' /></Box>}
        {!isLoading && errorStatus && <Box sx={{ flexGrow: 1, height: '100%', widht: '100%' }}><Error text='Error retrieving workspace.' response={errorStatus}></Error></Box>}
        {!isLoading && !errorStatus &&
          <>
            <SideBar selected={activeEmployeeTab} title={workSpaceName} entries={entries} setTab={(index) => { setActiveEmployeeTab(index); setActiveSectorTypeTab(0) }} subtitle='' color='primary' useButton={true} buttonText='Add Employee' buttonClick={() => { setOpenAddEmployee(true) }} />
            {
              activeEmployeeTab !== -1 && workSpace && entries[activeEmployeeTab] && <SideBar selected={activeSectorTypeTab} title={entries[activeEmployeeTab].name} color='secondary' setTab={setActiveSectorTypeTab} useButton={true} buttonText='Add Types To Resume' buttonClick={() => { setShowChooseSectorTypeDialog(true) }} entries={getResumeEntries()}></SideBar>
            }
            <Box sx={{ width: '100%' }}>
              <Box m={1.5} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Link to='/project/workspaces' style={{ textDecoration: 'none' }}>
                  <Button endIcon={<ArrowForward />}>Back to Workspaces</Button>
                </Link>
                
              </Box>
              <Box my={2}>
                <Divider variant='middle'/>
              </Box>
              {
                activeEmployeeTab !== -1 && workSpace && entries[activeEmployeeTab] && activeSectorTypeTab !== -1 && drawSectors()
              }
              {
                activeEmployeeTab !== -1 && workSpace && entries[activeEmployeeTab] &&                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', position: 'fixed', bottom: 10, right: 10 }}>
                  <ConfirmDelete nameToDelete={`resume ${deleteResumeObj?.name}`} open={showDeleteDialogResume} onClose={() => { setShowDeleteDialogResume(false) }} onConfirm={() => { deleteResume() }} isDeleting={isDeletingResume} />
                  <Button variant='contained' color='secondary' sx={{ color: 'white' }} onClick={() => { setDeleteResumeObj(resumes[activeEmployeeTab]); setShowDeleteDialogResume(true);}}>Delete Resume</Button>
                </Box>
              }
            </Box>
          </>
        }
      </Box>
      <ChooseSectorTypes open={showChooseSectorTypeDialog} onSubmit={(types) => { handleSectorTypeSelectionSubmit(types) }} onClose={() => { setShowChooseSectorTypeDialog(false) }} />
      <AddEmployee wname={workSpaceName} workspaceId={workspaceId} open={openAddEmployee} onClose={() => { setOpenAddEmployee(false); getWorkspace(); }}></AddEmployee>
      {
        activeEmployeeTab !== -1 && workSpace && <SectorSelection targetEid={resumes[activeEmployeeTab]?.employeeId} title={`${getResumeEntries() ? getResumeEntries()[activeSectorTypeTab]?.name : ''} Sectors`} open={showSelectionDialog} onClose={() => { setShowSelectionDialog(false) }} onSubmit={(sectors) => { handleSectorSelectionSubmit(sectors) }} singleSectorTypeObj={getResumeEntries() ? getResumeEntries()[activeSectorTypeTab] : null} />
      }
    </>
  );
}

export default EditWorkspace;
