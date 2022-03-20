import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import TextBox from '../../components/TextBox/TextBox';
import { Box, Typography } from '@mui/material';
import AddButton from '../../components/AddButton';
import SideBarResumeTemplate from '../../containers/SideBarResumeTemplate';
import AddSectorType from '../../containers/AddSectorType';
// import { mockWorkspaces } from './__mocks__/mockWorkspaces';
// import { mockWorkspaceResumes } from './__mocks__/mockWorkspaceResumes';
import Divider from '@mui/material/Divider';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import axios from 'axios';


const mockTemplate = {
  name: 'Project Name',
  template: ['experience', 'education', 'projects'],
}

// const requestAllSectors = axios.get('/Facade/GetAllSectorTypes');
// const requestTemplate = axios.get('/Admin/GetTemplate', { params: { templateID: workspaceID }});
// const requestTemplateSectors = axios.get('Admin/GetSectorsInTemplate', { params: { templateID: workspaceID }});

// const entries = mockTemplate.template.map(sector => { return ({ name: sector, error: false }) });


function EditWorkspace() {
  // const workspaceID = useSelector(templateSelectors.getTemplateID);

  let { templateId } = useParams();

  const [activeTemplateTab, setActiveTemplateTab] = useState(0);
  const [template, setTemplate] = useState([]);
  const [entries, setEntries] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

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

  // useEffect(() => {
  //   axios.all([
  //     axios.get('/Facade/GetAllSectorTypes'),
  //     axios.get('/Admin/GetTemplate', { params: { templateID: workspaceID } })]).then(
  //       axios.spread((allSectors, template) => {
  //         console.log(allSectors);
  //         console.log(template);
  //         setTemplate(template);
  //         // createEntries(allSectors, templateSectors, setEntries);
  //       })
  //     )
  // })



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {isLoading && <Loading text='Loading Template...' />}
      {!isLoading && errorStatus && <Error text='Error retrieving resume.' response={errorStatus}></Error>}
      {!isLoading && !errorStatus &&
        <>
          <Box m={2}>
            <Typography variant='h3'>{template.title ? template.title : ''}</Typography>
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
            <AddSectorType open={showAddDialog} onClose={() => setShowAddDialog(!showAddDialog)} />
          }
        </>
      }
    </Box>
  );
}

export default EditWorkspace;
