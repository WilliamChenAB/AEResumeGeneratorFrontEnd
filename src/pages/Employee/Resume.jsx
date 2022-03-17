import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import SideBar from '../../containers/SideBar';
import { sectorSelectors } from '../../slices/sectorSlice';
import { useSelector } from 'react-redux';
import AddButton from '../../components/AddButton';
import TextBox from '../../components/TextBox/TextBox';
import SectorSelection from '../../containers/SectorSelection';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import axios from 'axios';

function Resume() {
  let { resumeId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const tabs = useSelector(sectorSelectors.getSectorsHeaders);
  const sectorSections = useSelector(sectorSelectors.getSectors);
  const [activeTab, setActiveTab] = useState(0);
  const [showDialog, setShowDialog] = useState(false);
  const [sectors, setSectors] = useState([]);

  // Get resume
  useEffect(() => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Facade/GetResume', {
      params: {
        RID: resumeId,
      }
    }).then((response) => {
      setSectors(response.data.sectorList.map((sector) => {
        return {
          id: sector.sid,
          updateDate: sector.lastEditedDate,
          content: sector.content,
          sectorType: sector.sectorType,
        }
      }));
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }, []);

  const entries = tabs.map(tab => {
    return { name: tab, error: Object.keys(sectorSections[tabs[activeTab]]).length === 0 }
  })

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box>
        <SideBar title='John Doe' subtitle='Utility Coordinator' entries={entries} setTab={setActiveTab} color='primary' useButton buttonText='Add Sector' buttonClick={() => { setShowDialog(true) }} />
      </Box>
      <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
        {isLoading && <Loading text='Loading Resume...' />}
        {!isLoading && errorStatus && <Error text='Error retrieving resume.' response={errorStatus}></Error>}
        {!isLoading && !errorStatus &&
          <>
            <Link to='/employee/resumes' style={{ textDecoration: 'none' }}>
              <Button startIcon={<ArrowBack />}>Back to Resumes</Button>
            </Link>
            <br />
            <br />
            <Typography variant='subtitle2'>37th Street SW Storm Trunk Relocation Contract</Typography>
            <br />
            <Typography variant='h3'>{tabs[activeTab].toUpperCase()}</Typography>
            <br />
            <SectorSelection resumeName='37th Street SW Storm Trunk Relocation Contract' open={showDialog} onClose={() => { setShowDialog(false) }} />
            <AddButton text='Add Blank Sector' />
            {sectors.map((sector) =>
              <Box mb={5} key={sector.id}>
                <TextBox key={sector.id} id={sector.id} text={sector.content} />
              </Box>
            )}
          </>
        }
      </Box>
    </Box>
  )
}

export default Resume;