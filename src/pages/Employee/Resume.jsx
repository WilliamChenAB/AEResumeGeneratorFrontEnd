import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import SideBar from '../../containers/SideBar0';
import { sectorSelectors } from '../../slices/sectorSlice';
import { useSelector } from 'react-redux';
import AddButton from '../../components/AddButton';
import TextBox from '../../components/TextBox/TextBox';
import SectorSelection from '../../containers/SectorSelection';

const placeholderText = 'John Doe is a municipal infrastructure engineer in our Calgary office with 19 years utility design and coordination experience. He has keen understanding of local stakeholders, personnel, and processes to successfully expedite utility coordination as they relate to the 5th Avenue Flyover bridge and has established personal contacts with deep and franchise utility companies to facilitate coordination.';

function Resume() {
  // use this id from link to query database for this resume
  let { resumeId } = useParams();

  const tabs = useSelector(sectorSelectors.getSectorsHeaders);
  const sectorSections = useSelector(sectorSelectors.getSectors);
  const [activeTab, setActiveTab] = useState(0);
  const [showDialog, setShowDialog] = useState(false);

  const entries = tabs.map(tab => {
    return { name: tab, error: Object.keys(sectorSections[tabs[activeTab]]).length === 0 }
  })

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box>
        <SideBar title='John Doe' subtitle='Utility Coordinator' entries={entries} setTab={setActiveTab} color='primary' useButton buttonText='Add Sector' buttonClick={() => { setShowDialog(true) }} />
      </Box>
      <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
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
        <AddButton text="Add Blank Sector" />
        <br />
        <br />
        {tabs[activeTab]} sectors that belong to this resume will be displayed here from the backend!
        <Box mb={5}>
          <TextBox text={placeholderText} />
        </Box>
      </Box>
    </Box>
  )
}

export default Resume;