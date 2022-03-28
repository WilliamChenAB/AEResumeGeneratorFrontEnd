import { useEffect, useState } from 'react';
import TextBox from '../../components/TextBox/TextBox';
import { Box, Typography } from '@mui/material';
import SideBar from '../../containers/SideBar';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import AlertPopup from '../../components/AlertPopup';
import ConfirmDelete from '../../containers/ConfirmDelete';
import axios from 'axios';

function Sectors() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [sectors, setSectors] = useState([]);
  const [sectorTypes, setSectorTypes] = useState([]);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteSectorId, setDeleteSectorId] = useState('');

  const getAllSectors = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Sector/GetAllForEmployee', {
      params: {
        // TODO - replace with employeeId of logged in user
        employeeId: '1',
      }
    }).then((response) => {
      const typesAll = response.data.map((sector) => {
        return {
          id: sector.typeId,
          name: sector.typeTitle || 'untitled',
          error: false,
        };
      });
      const typesUnique = [...new Map(typesAll.map(item => [item.id, item])).values()];
      setSectorTypes(typesUnique);
      setSectors(response.data.map((sector) => {
        return {
          id: sector.sectorId,
          createDate: sector.creationDate,
          updateDate: sector.lastEditedDate,
          content: sector.content,
          type: sector.typeId,
          resumeName: sector.resumeName,
        }
      }));
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  useEffect(() => {
    getAllSectors();
  }, []);

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
      getAllSectors();
    }).catch((error) => {
      setIsDeleting(false);
      setOpenCompleteMessage({
        type: 'error',
        text: `An error occurred while deleting sector. (${error.response.status} ${error.response.statusText})`
      });
      setShowDeleteDialog(false);
    });
  };

  const handleDeleteClick = (sectorId) => {
    setDeleteSectorId(sectorId);
    setShowDeleteDialog(true);
  }

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={() => { setOpenCompleteMessage(false) }}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      <ConfirmDelete nameToDelete={`a sector. It will be deleted from its resume`} open={showDeleteDialog} onClose={() => { setShowDeleteDialog(false) }} onConfirm={() => { deleteSector() }} isDeleting={isDeleting} />
      <Box>
        <SideBar title='John Doe' subtitle='Utility Coordinator' entries={sectorTypes} setTab={setActiveTab} color='primary' />
      </Box>
      <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
        {isLoading && <Loading text='Loading Sectors...' />}
        {!isLoading && errorStatus && <Error text='Error retrieving sectors.' response={errorStatus}></Error>}
        {!isLoading && !errorStatus &&
          <>
            <Box mb={4}>
              <Typography variant='h3'>{sectorTypes[activeTab]?.name.toUpperCase()} SECTORS</Typography>
            </Box>
            {sectors.filter((sector) => {
              return sector.type === sectorTypes[activeTab]?.id;
            }).map((sector) =>
              <Box mb={5} key={sector.id}>
                <TextBox key={sector.id} id={sector.id} text={sector.content} onDelete={() => { handleDeleteClick(sector.id) }} header={`Resume: ${sector.resumeName}`} footer={`Date Created: ${sector.createDate}`} />
              </Box>
            )}
          </>
        }
      </Box>
    </Box>
  );
}

export default Sectors;