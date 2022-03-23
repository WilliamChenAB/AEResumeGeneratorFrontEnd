import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TextBox from '../../components/TextBox/TextBox';
import { Box, Button } from '@mui/material';
import AddButton from '../../components/AddButton';
import SideBarResumeTemplate from '../../containers/SideBarResumeTemplate';
import AddSectorType from '../../containers/AddSectorType';
import Divider from '@mui/material/Divider';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import AlertPopup from '../../components/AlertPopup';
import axios from 'axios';
import EditableTextField from '../../components/EditableTextField';



function EditTemplate() {

  let { templateId } = useParams();

  const [activeTemplateTab, setActiveTemplateTab] = useState(0);
  const [template, setTemplate] = useState([]);
  const [entries, setEntries] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [editTemplateName, setEditTemplateName] = useState(false);

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

  const setTemplateName = () => {

  }

  const onTabClick= () => {

  }



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
          <Box m={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <EditableTextField templateText={template.title ? template.title : ''} setTemplateText={() => { }} tabClicked={activeTemplateTab}/>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Box mr={2}>
                <Button variant='contained' onClick={() => getTemplateSectors()} >Clear</Button>
              </Box>
              <Button variant='contained' onClick={() => { }} >Save</Button>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'row', height: '83vh', overflow: 'auto' }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <SideBarResumeTemplate entries={entries} setTab={(index) => { setActiveTemplateTab(index) }} color='primary' />
              <Box m={2}>
                <AddButton text='Add sector type' onClick={() => setShowAddDialog(true)} />
              </Box>
            </Box>
            {entries.length > 0 &&
              <Box m={4} sx={{ width: '100%' }}>
                <EditableTextField templateText={entries[activeTemplateTab].name} setTemplateText={() => {}} tabCLicked={activeTemplateTab}/>
                <Box my={3}>
                  <TextBox rows={5} hideEdit></TextBox>
                </Box>
              </Box>
            }
          </Box>
          {showAddDialog &&
            <AddSectorType open={showAddDialog} onClose={() => setShowAddDialog(!showAddDialog)} onSave={() => getTemplateSectors()} />
          }
        </>
      }
    </Box>
  );
}

export default EditTemplate;
