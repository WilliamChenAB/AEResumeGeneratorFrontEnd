import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TextBox from '../../components/TextBox/TextBox';
import { Box, Button, Typography } from '@mui/material';
import AddButton from '../../components/AddButton';
import SideBarResumeTemplate from '../../containers/SideBarResumeTemplate';
import AddSectorType from '../../containers/AddSectorType';
// import { mockWorkspaces } from './__mocks__/mockWorkspaces';
// import { mockWorkspaceResumes } from './__mocks__/mockWorkspaceResumes';
import Divider from '@mui/material/Divider';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import AlertPopup from '../../components/AlertPopup';
import axios from 'axios';


function EditWorkspace() {

  let { templateId } = useParams();

  const [activeTemplateTab, setActiveTemplateTab] = useState(0);
  const [template, setTemplate] = useState([]);
  const [entries, setEntries] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);

  const createEntries = (allEntries, selectedEntries) => {
    const entries = allEntries.map((entry) => { return ({ name: entry.title, error: false, checked: selectedEntries.includes(entry.typeID) }) })
    setEntries(entries);
    setIsLoading(false);
  }

  const getTemplateSectors = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.all([
      axios.get('/Facade/GetAllSectorTypes'),
      axios.get('/Admin/GetTemplate', { params: { templateID: templateId } }),
      axios.get('Admin/GetSectorsInTemplate', { params: { templateID: templateId } })
    ]).then(
      axios.spread((allSectors, template, templateSectors) => {
        setTemplate(template.data);
        createEntries(allSectors.data, templateSectors.data.map(({ typeID }) => typeID));
        setIsLoading(false);
      })
    ).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  useEffect(() => {
    getTemplateSectors();
  }, []);



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={() => { setOpenCompleteMessage(false) }}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      {isLoading && <Loading text='Loading Template...' />}
      {!isLoading && errorStatus && <Error text='Error retrieving resume.' response={errorStatus}></Error>}
      {!isLoading && !errorStatus &&
        <>
          <Box m={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h3'>{template.title ? template.title : ''}</Typography>
            {/* <Button variant='contained' onClick={handleSubmit} disabled={submitDisabled}>Save Sector Types</Button> */}
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'row', height: '100%' }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <SideBarResumeTemplate entries={entries} setTab={(index) => { setActiveTemplateTab(index) }} color='primary' />
              <Box m={2}>
                <AddButton text='Add sector type' onClick={() => setShowAddDialog(true)} />
              </Box>
            </Box>
            {entries.length > 0 &&
              <Box m={4} sx={{ width: '100%' }}>
                <Typography variant='h3'>{entries[activeTemplateTab].name.toUpperCase()}</Typography>
                <Box my={3}>
                  <TextBox rows={5} hideEdit></TextBox>
                </Box>
              </Box>
            }
          </Box>
          {showAddDialog &&
            <AddSectorType open={showAddDialog} onClose={() => setShowAddDialog(!showAddDialog)} onSave={() => getTemplateSectors()}/>
          }
        </>
      }
    </Box>
  );
}

export default EditWorkspace;
