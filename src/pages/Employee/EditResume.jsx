import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import EmployeePage from './EmployeePage';
import { sectorSelectors } from '../../slices/sectorSlice';
import ExperienceTextBox from '../../components/TextBox/ExperienceTextBox';
import TextBox from '../../components/TextBox/TextBox';
import TextField from '@mui/material/TextField';
import { Box, Typography } from '@mui/material';
import AddButton from '../../components/AddButton';

function EditResume() {
  const tabs = useSelector(sectorSelectors.getSectorsHeaders);
  const sectorSections = useSelector(sectorSelectors.getSectors)
  const [activeTab, setActiveTab] = useState(0);

  const entries = tabs.map(tab => {
    return {name: tab, error: Object.keys(sectorSections[tabs[activeTab]]).length === 0}
  })

  return(
    <>
      <EmployeePage tabs={entries} setTab={setActiveTab}>
        <Box mb={4}>
          <Typography variant='h3'>{tabs[activeTab].toUpperCase()}</Typography>
        </Box>
        {tabs[activeTab] === 'education' && 
          <>
            <Box mb={5}>
            <TextField
              id="edit-resume-experience-years"
              label="Years of Experience"
              defaultValue={sectorSections[tabs[activeTab]].years}
            />
            </Box>
            {Object.entries(sectorSections[tabs[activeTab]].sections).map(([sid, description]) => <Box mb={5} key={sid}><TextBox key={sid} text={description}/></Box>)}
          </>
        }
        {tabs[activeTab] === 'experience' &&  Object.entries(sectorSections[tabs[activeTab]]).map(([sid, body]) => 
          <Box mb={5} key={sid}>
            <ExperienceTextBox key={sid} name={body.title} location={body.location} division={body.division} description={body.description} />
          </Box>
        )}
        {tabs[activeTab] !== 'education' && tabs[activeTab] !== 'experience' && Object.entries(sectorSections[tabs[activeTab]]).map(([sid, description]) => <Box mb={5} key={sid}><TextBox key={sid} text={description}/></Box>)}
        <Box mb={5}><AddButton text="Add Section" /></Box>
      </EmployeePage>
    </>
  )
}

export default EditResume;