import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import AddButton from '../../components/AddButton';
import TemplateTable from '../../components/Table/TemplateTable';
import SearchBar from '../../components/SearchBar';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import AddTemplate from '../../containers/AddTemplate';
import { useNavigate } from 'react-router-dom';
import ConfirmDelete from '../../containers/ConfirmDelete';
import AlertPopup from '../../components/AlertPopup';
import axios from 'axios';

const createRow = (data) => {
  return { id: data.templateID, name: data.title, updateDate: data.lastEdited }
}

function ResumeTemplates() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTemplateObj, setDeleteResumeObj] = useState({});
  const navigate = useNavigate();

  const getAllTemplates = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Facade/GetAllTemplates').then((response) => {
      setTemplates(response.data.map((data) => createRow(data)));
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  const deleteTemplate = () => {
    setIsDeleting(true);
    axios.delete('/Admin/DeleteTemplate', {
      params: {
        templateID: deleteTemplateObj.id,
      }
    }).then(() => {
      setIsDeleting(false);
      setOpenCompleteMessage({
        type: 'success',
        text: `Template ${deleteTemplateObj.resumeName} has been permanently deleted.`
      });
      setShowDeleteDialog(false);
      getAllTemplates();
    }).catch((error) => {
      setIsDeleting(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while deleting resume. (${error.response.status} ${error.response.statusText})`
      });
      setShowDeleteDialog(false);
    });
  };

  const handleDeleteClick = (templateObj) => {
    console.log(templateObj)
    setDeleteResumeObj(templateObj);
    setShowDeleteDialog(true);
  }

  useEffect(() => {
    getAllTemplates();
  }, []);






  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={() => { setOpenCompleteMessage(false) }}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      <ConfirmDelete nameToDelete={`template ${deleteTemplateObj?.resumeName}`} open={showDeleteDialog} onClose={() => { setShowDeleteDialog(false) }} onConfirm={() => { deleteTemplate() }} isDeleting={isDeleting} />
      <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
        {isLoading && <Loading text='Loading Templates...' />}
        {!isLoading && errorStatus && <Error text='Error retrieving resume.' response={errorStatus}></Error>}
        {!isLoading && !errorStatus && <>
          <Box mb={4} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flexGrow: 1, alignItems: 'flex-end' }}>
              <Typography variant='h3'>RESUME TEMPLATES</Typography>
            </Box>
            <SearchBar placeholder='Search Templates' onChange={() => { }}></SearchBar>
          </Box>
          <AddButton text='Add Template' onClick={() => setShowAddDialog(!showAddDialog)} />
          <TemplateTable rows={templates} handleSelect={(id) => { navigate('/system/templates/'.concat(id)); }} onDeleteClick={(templateObj) => { handleDeleteClick(templateObj) }}/>
          {showAddDialog &&
            <AddTemplate templates={templates} open={showAddDialog} onClose={() => setShowAddDialog(!showAddDialog)} />
          }
        </>
        }
      </Box>
    </Box>

  )
}

export default ResumeTemplates;

// workSpaceExpanded={(id)=>{navigate('/project/editWorkspace')}}