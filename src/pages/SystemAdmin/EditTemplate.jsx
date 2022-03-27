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
import { useDispatch, useSelector } from 'react-redux';
import { templateSelectors, templateActions } from '../../slices/templateSlice';

function EditTemplate() {
  let { templateId } = useParams();
  const dispatch = useDispatch();

  const [activeTemplateTab, setActiveTemplateTab] = useState(0);
  const [template, setTemplate] = useState([]);
  const [entries, setEntries] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [allSectors, setAllSectors] = useState([]);

  const selectedSectors = useSelector(templateSelectors.getSelectedSectorTypes);

  const createEntries = (selected) => {
    const entries = allSectors.map((entry) => { return ({ name: entry.title, error: false, checked: selected.includes(entry.typeID) }) })
    setEntries(entries);
    if (selectedSectors.length > 0) {
      setIsLoading(false);
    }

  }

  const getTemplateSectors = () => {
    // dispatch(templateActions.clearTemplate());
    setIsLoading(true);
    setErrorStatus(false);
    axios.all([
      axios.get('/Facade/GetAllSectorTypes'),
      axios.get('/Admin/GetTemplate', { params: { templateID: templateId } }),
      axios.get('Admin/GetSectorsInTemplate', { params: { templateID: templateId } })
    ]).then(
      axios.spread((allSectors, template, templateSectors) => {
        setTemplate(template.data);
        setAllSectors(allSectors.data);
        dispatch(templateActions.setTemplateSectors(templateSectors.data.map(({ typeID }) => typeID)));
        setFirstRender(false);
      })
    ).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  useEffect(() => {
    getTemplateSectors();
  }, []);

  useEffect(() => {
    createEntries(selectedSectors);
  }, [selectedSectors])


  // Actions for updating template name

  const saveTemplateName = () => {
    if (!firstRender) {
      setIsLoading(true);
      setErrorStatus(false);
      axios.put('/Admin/EditTemplate', template, {
        params: { templateID: templateId }
      }).then(() => {
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
        setErrorStatus(error.response);
        setOpenCompleteMessage({
          type: 'error',
          text: `An error occurred while editing template name. (${error.response.status} ${error.response.statusText})`
        });
      });
    }
  }

  // params: title, description

  const setTemplateName = (newName) => {
    setTemplate({ ...template, title: newName });
  }

  useEffect(() => {
    saveTemplateName();
  }, [template]);


  // Actions for updating sector type name
  // params: { sectorTypeID: allSectors[activeTemplateTab].typeID, title: newName } 

  const saveSectorTypeName = (newName) => {
    if (!firstRender) {
      setIsLoading(true);
      setErrorStatus(false);
      axios.put('/Admin/EditSectorTypeTitle', null, {
        params: { sectorTypeID: allSectors[activeTemplateTab].typeID, title: newName }
      }).then(() => {
        getTemplateSectors();
      }).catch((error) => {
        setIsLoading(false);
        setErrorStatus(error.response);
        setOpenCompleteMessage({
          type: 'error',
          text: `An error occurred while editing sector type name. (${error.response.status} ${error.response.statusText})`
        });
      });
    }
  }

  // Action for updating selected sector types

  const addSelectedSectorTypes = (index) => {
    const typeID = allSectors[index].typeID;
    if (selectedSectors.includes(typeID)) {
      dispatch(templateActions.removeTemplateSector(typeID));
    } else {
      dispatch(templateActions.addTemplateSector(typeID));
    }
  }

  const saveSelectedSectorTypes = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.put('/Admin/AssignSectorTypes', selectedSectors, {
      params: {
        templateID: templateId
      }
    }).then(() => {
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while saving sector types. (${error.response.status} ${error.response.statusText})`
      });
    });
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
          <Box m={1.5} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <EditableTextField templateText={template.title ? template.title : ''} setTemplateText={setTemplateName} tabClicked={activeTemplateTab} />
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'row', height: '83vh', overflow: 'auto' }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <SideBarResumeTemplate selected={activeTemplateTab} entries={entries} setTab={(index) => { setActiveTemplateTab(index) }} color='primary' onCheck={addSelectedSectorTypes} />
              <Box m={2}>
                <AddButton text='Add sector type' onClick={() => setShowAddDialog(true)} />
                <Button fullWidth variant='contained' onClick={() => saveSelectedSectorTypes()} >Save Template Sectors</Button>
              </Box>
            </Box>
            {entries.length > 0 &&
              <Box m={4} sx={{ width: '100%' }}>
                <EditableTextField templateText={entries[activeTemplateTab].name} setTemplateText={saveSectorTypeName} tabClicked={activeTemplateTab} />
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
