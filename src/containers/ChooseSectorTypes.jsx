import { useEffect, useState } from 'react';
import { Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, MenuItem, Select } from '@mui/material';
import { Close } from '@mui/icons-material';
import Loading from '../components/Loading';
import Error from '../components/Error';
import axios from 'axios';

function ChooseSectorTypes({ open, onSubmit, onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [sectorTypes, setSectorTypes] = useState([]);

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      setErrorStatus(false);
      axios.get('/Facade/GetAllSectorTypes').then((response) => {
        setSectorTypes(response.data.map((type) => {
          return {
            id: type.typeID,
            name: type.title || 'untitled',
            description: type.description,
            selected: false,
          };
        }));
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
        setErrorStatus(error.response);
      });
    }
  }, [open]);

  const handleSubmit = () => {
    let selectedTypes = sectorTypes.filter(type => type.selected);
    onSubmit(selectedTypes);
    onClose();
  }

  return (
    <Dialog maxWidth='md' fullWidth open={open}>
      <DialogTitle>
        Add Sector Types
        <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={() => { onClose() }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {isLoading && <Loading text='Loading Sector Types...' />}
        {!isLoading && errorStatus && <Error text='Error retrieving sector types.' response={errorStatus}></Error>}
        {!isLoading && !errorStatus &&
          <>
            <DialogContentText>
              Selected sector types will be added to your resume with a blank sector.
            </DialogContentText>
            <FormControl fullWidth>
              <Select
                multiple
                value={sectorTypes.filter((type) => {
                  return type.selected;
                })}
                onChange={(event) => {
                  const index = sectorTypes.findIndex((type) => {
                    return type.id === event.target.value[event.target.value.length - 1];
                  });
                  if (index > -1) {
                    setSectorTypes([
                      ...sectorTypes.slice(0, index),
                      {
                        ...sectorTypes[index],
                        selected: !sectorTypes[index].selected,
                      },
                      ...sectorTypes.slice(index + 1),
                    ]);
                  }
                }}
                renderValue={(selected) => {
                  return (<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => {
                      return (<Chip key={value.id} label={value.name} />);
                    })}
                  </Box>)
                }}>
                {sectorTypes.map((type) => {
                  return (<MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>);
                })}
              </Select>
            </FormControl>
          </>
        }
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={handleSubmit} disabled={sectorTypes.findIndex((type) => { return type.selected === true }) === -1}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChooseSectorTypes;