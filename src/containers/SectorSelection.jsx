import { useEffect, useState} from 'react';
import { Button, Divider, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Box, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import SideBarTabs from '../components/SideBarTabs'
import SearchBar from '../components/SearchBar';
import ExperienceTextBox from '../components/TextBox/ExperienceTextBox';
import { colorToken } from '../theme/colorToken';
import Loading from '../components/Loading';
import { debounce } from "lodash"
import Error from '../components/Error';
import SortButton from '../components/SortButton';
import axios from 'axios';

/**
 * Select Sector popup
 * @param title title of dialog
 * @param open Boolean for if dialog is open
 * @param onClose Handler for when dialog should be closed
 * @param onSubmit Handler for when submit button is clicked
 * @param targetEid Target employee ID
 * @param Submittable Whether or not dialog is submittable
 * @param singleSectorTypeObj Object of single sector type
 * @returns SectorSelection dialog
 */
function SectorSelection({ title, open, onClose, onSubmit, targetEid = false, submittable = true, singleSectorTypeObj }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [sectors, setSectors] = useState([]);
  const [filteredSectors, setFilteredSectors] = useState([]);
  const [sectorTypes, setSectorTypes] = useState([]);
  const [sortState, setSortState] = useState(0);
  const [search, setSearch] = useState('');


  const debouncedSearch = debounce(async (criteria) => {
    searchSectors(criteria);
  }, 300);

  useEffect(() => {
    if (open && !singleSectorTypeObj) {
      const endpoint = targetEid ? '/Sector/GetAllForEmployee' : '/Sector/GetAllPersonal';
      const params = targetEid ? { params: { employeeId: targetEid } } : null;
      setIsLoading(true);
      setErrorStatus(false);
      axios.get(endpoint, params
      ).then((responseSectors) => {
        axios.get('/SectorType/GetAll').then((responseTypes) => {
          setSectorTypes(responseTypes.data.map((type) => {
            return {
              id: type.typeId,
              name: type.title || 'untitled',
              description: type.description,
            };
          }));
          setSectors(responseSectors.data.map((sector) => {
            return {
              id: sector.sectorId,
              createDate: sector.creationDate,
              updateDate: sector.lastEditedDate,
              content: sector.content,
              division: sector.division,
              image: sector.image,
              type: sector.typeId,
              resumeName: sector.resumeName,
              selected: false,
            }
          }));
          setFilteredSectors(false);
          setIsLoading(false);
        }).catch((error) => {
          setIsLoading(false);
          setErrorStatus(error.response);
        });
      }).catch((error) => {
        setIsLoading(false);
        setErrorStatus(error.response);
      });
    } else if (open && singleSectorTypeObj) {
      const endpoint = targetEid ? '/Sector/GetAllForEmployeeByType' : '/Sector/GetAllPersonalByType';
      const params = targetEid ? { params: { employeeId: targetEid, typeId: singleSectorTypeObj.id } } : { params: { typeId: singleSectorTypeObj.id } };
      setIsLoading(true);
      setErrorStatus(false);
      axios.get(endpoint, params
      ).then((response) => {
        setSectorTypes([{
          id: singleSectorTypeObj.id,
          name: singleSectorTypeObj.name,
          description: singleSectorTypeObj.description,
        }]);
        setSectors(response.data.map((sector) => {
          return {
            id: sector.sectorId,
            createDate: sector.creationDate,
            updateDate: sector.lastEditedDate,
            division: sector.division,
            image: sector.image,
            content: sector.content,
            type: sector.typeId,
            resumeName: sector.resumeName,
            selected: false,
          }
        }));
        setFilteredSectors(false);
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
        setErrorStatus(error.response);
      });
    }
  }, [open]);

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

  const searchSectors = (search) => {
    setIsLoading(true);
    setErrorStatus(false);
    const url = targetEid ? '/Search/EmployeeSectors' : '/Search/OwnSectors';
    const params = targetEid ? { params: { filter: search, EmployeeId: targetEid, } } : { params: { filter: search } };
    axios.get(url, params).then((response) => {
      setFilteredSectors(response.data);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  const handleClose = (success) => {
    setSortState(0);
    onClose(success);
  }

  const handleSubmit = (ev) => {
    let requests = sectors.filter(sector => sector.selected);
    if (requests.length > 0) {
      onSubmit(requests);
    }
    handleClose(true);
  }

  return (
    <div>
      <Dialog fullWidth maxWidth='lg' open={open}>
        <DialogTitle>
          <div><Typography variant='h2'>{`Sectors: ${title}`}</Typography></div>
          <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => { handleClose(false); }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <Box sx={{ pb: 1, pl: 2, display: 'flex', flexDirection: 'row' }}>
          <Box sx={{ width: '50%' }}>
            <SearchBar defaultValue='' placeholder='Search Sectors' onChange={(value) => { setSearch(value);debouncedSearch(value)}}></SearchBar>
          </Box>
        </Box>
        <Divider color='primary' />
        <DialogContent style={{ height: '600px', padding: '0px 0px 0px 0px' }}>
          {isLoading && <Loading text='Loading Sectors...' />}
          {!isLoading && errorStatus && <Error text='Error retrieving sectors.' response={errorStatus}></Error>}
          {!isLoading && !errorStatus &&
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              {!singleSectorTypeObj &&
                <>
                  <Box sx={{ width: 300, height: '600px' }}>
                    <SideBarTabs
                      entries={sectorTypes}
                      showCheckBoxes={false}
                      color={colorToken.brand.aeBlueLight}
                      selectedColor={colorToken.brand.aeBlueMid}
                      textColor={colorToken.greyPalette.aeBlue}
                      onEntryClick={setActiveTab}
                      selected={activeTab} />
                  </Box>
                  <Divider color='primary' orientation='vertical' flexItem />
                </>
              }
              <Box sx={{ ml: 5, mr: 5, mt: 2, width: '100%', maxHeight: '100%', overflow: 'auto' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <SortButton sortName='Last Updated' sortState={sortState} onClick={() => { setSortState((sortState + 1) % 3) }} />
                </Box>
                {sectors.filter((sector) => {
                  return sector.type === sectorTypes[activeTab]?.id;
                }).sort(sorting).map((sector) => {
                  if (filteredSectors === false || search === '' || filteredSectors.find((filterSector) => sector.id == filterSector.sectorId)) {
                    return (
                      <Box mb={5} key={sector.id}>
                        <ExperienceTextBox imageLinkIn={sector.image} divisionIn={sector.division} key={sector.id} sectorId={sector.id} text={sector.content} selectState={sector.selected} onSelect={() => { sector.selected = !sector.selected }} header={`Resume: ${sector.resumeName}`} footer={`Date Created: ${sector.createDate}`} hideEdit selectable={submittable} />
                      </Box>)
                  }
                  return (null);
                }
                )}
              </Box>
            </Box>
          }
        </DialogContent>
        {submittable &&
          <>
            <Divider color='primary' />
            <DialogActions>
              <Button variant='contained' onClick={() => { handleSubmit() }} disabled={false}>Copy Selected Sectors</Button>
            </DialogActions>
          </>
        }
      </Dialog>
    </div>
  );
}

export default SectorSelection;
