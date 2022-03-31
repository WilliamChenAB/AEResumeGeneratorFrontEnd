import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import TextBox from '../../components/TextBox/TextBox';
import { ArrowForward } from '@mui/icons-material';
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
import { colorToken } from '../../theme/colorToken';

function EditTemplate() {
  let { templateId } = useParams();
  const dispatch = useDispatch();

  const [activeTemplateTab, setActiveTemplateTab] = useState(0);
  const [templateName, setTemplateName] = useState('');
  const [templateDescription, setTemplateDescription] = useState('');
  const [entries, setEntries] = useState([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [firstRender, setFirstRender] = useState(true);
  const [allSectors, setAllSectors] = useState([]);

  const selectedSectors = useSelector(templateSelectors.getSelectedSectorTypes);

  // Get template

  const getTemplateSectors = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.all([
      axios.get('/SectorType/GetAll'),
      axios.get('/Template/Get', { params: { templateId: templateId } }),
      axios.get('/Template/GetSectors', { params: { templateId: templateId } })
    ]).then(
      axios.spread((allSectors, template, templateSectors) => {
        setTemplateName(template.data.title);
        setTemplateDescription(template.data.description);
        setAllSectors(allSectors.data);
        dispatch(templateActions.setTemplateSectors(templateSectors.data.map(({ typeId }) => typeId)));
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

  // Update template

  const updateTemplateSectors = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/SectorType/GetAll').then((response) => {
      setAllSectors(response.data);
      setFirstRender(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  // Create entries 

  const mapEntries = new Promise((resolve) => {
    resolve(allSectors.map((entry) => { return ({ name: entry.title, error: false, checked: selectedSectors.includes(entry.typeId) }) }))
  })

  const createEntries = () => {
    mapEntries.then((entries) => {
      setEntries(entries);
      setIsLoading(false);
    })
  }

  useEffect(() => {
    createEntries(selectedSectors);
  }, [selectedSectors, allSectors])



  // Actions for updating template name


  useEffect(() => {
    if (!firstRender) {
      setIsLoading(true);
      setErrorStatus(false);
      axios.put('/Template/Edit', null, {
        params: { templateID: templateId, title: templateName, description: templateDescription }
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
  }, [templateName]);


  // Actions for updating sector type name

  const saveSectorTypeName = (newName) => {
    if (!firstRender) {
      setIsLoading(true);
      setErrorStatus(false);
      axios.put('/SectorType/EditTitle', null, {
        params: { sectorTypeId: allSectors[activeTemplateTab].typeId, title: newName }
      }).then(() => {
        axios.get('/SectorType/GetAll').then((allSectors) => {
          setAllSectors(allSectors.data);
        }).catch((error) => {
          setIsLoading(false);
          setErrorStatus(error.response);
          setOpenCompleteMessage({
            type: 'error',
            text: `An error occurred while getting all sector types. (${error.response.status} ${error.response.statusText})`
          });
        })
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
    const typeId = allSectors[index].typeId;
    if (selectedSectors.includes(typeId)) {
      dispatch(templateActions.removeTemplateSector(typeId));
    } else {
      dispatch(templateActions.addTemplateSector(typeId));
    }
  }

  const saveSelectedSectorTypes = () => {
    if (!firstRender) {
      setIsLoading(true);
      setErrorStatus(false);
      axios.post('/Template/AssignSectorType', selectedSectors, {
        params: {
          templateId: templateId,
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
  }




  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={() => { setOpenCompleteMessage(false) }}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      {(isLoading || firstRender) && <Loading text='Loading Template...' />}
      {!isLoading && errorStatus && <Error text='Error retrieving template.' response={errorStatus}></Error>}
      {!isLoading && !firstRender && !errorStatus &&
        <>
          <Box m={1.5} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <EditableTextField tooltipEditText='Edit template name' tooltipSaveText='Save template name' templateText={templateName} setTemplateText={setTemplateName} tabClicked={activeTemplateTab} />
                <Link to='/system/templates' style={{ textDecoration: 'none' }}>
                  <Button endIcon={<ArrowForward />}>Back to Templates</Button>
                </Link>
                
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'row', height: '83vh', overflow: 'auto' }} >
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <SideBarResumeTemplate selected={activeTemplateTab} entries={entries} setTab={(index) => { setActiveTemplateTab(index) }} color='primary' onCheck={addSelectedSectorTypes} />
              <Box m={2}>
                <AddButton text='Add sector type' onClick={() => setShowAddDialog(true)} />
                <Button fullWidth sx={{color: colorToken.greyPalette.white, bgcolor: colorToken.brand.aeGreen}} variant='contained' onClick={() => saveSelectedSectorTypes()} >Save Template Sectors</Button>
              </Box>
            </Box>
            {entries.length > 0 &&
              <Box m={4} sx={{ width: '100%' }}>
                <EditableTextField tooltipEditText='Edit sector type name' tooltipSaveText='Save sector type name' templateText={entries[activeTemplateTab].name} setTemplateText={saveSectorTypeName} tabClicked={activeTemplateTab} />
                <Box my={3}>
                  <TextBox rows={5} hideEdit></TextBox>
                </Box>
              </Box>
            }
          </Box>
          {showAddDialog &&
            <AddSectorType open={showAddDialog} onClose={() => setShowAddDialog(!showAddDialog)} onSave={() => updateTemplateSectors()} />
          }
        </>
      }
    </Box>
  );


}


export default EditTemplate;
