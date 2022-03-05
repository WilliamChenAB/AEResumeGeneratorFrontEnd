import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import EmployeePage from './EmployeePage';
import { sectorSelectors } from '../../slices/sectorSlice';
import ExperienceTextBox from '../../components/TextBox/ExperienceTextBox';
import TextBox from '../../components/TextBox/TextBox';
import Box from '@mui/material/Box';

const ent = [{name: "Experience", error: false}, {name: "Education", error: false}, {name: "Summary", error: false}, {name: "Justification", error: false}];

function EditResume() {
  const tabs = useSelector(sectorSelectors.getSectorsHeaders);
  const sectorSections = useSelector(sectorSelectors.getSectors)
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return(
    <>
      <EmployeePage tabs={ent}>
        {activeTab === 'education' && Object.entries(sectorSections[activeTab].sections).map(([sid, description]) => <Box mb={5}><TextBox key={sid} text={description}/></Box>)}
        {activeTab === 'experience' &&  Object.entries(sectorSections[activeTab]).map(([sid, description]) => <Box mb={5}><ExperienceTextBox key={sid} text={description}/></Box>)}
        {activeTab !== 'education' && activeTab !== 'experience' && Object.entries(sectorSections[activeTab]).map(([sid, description]) => <Box mb={5}><TextBox key={sid} text={description}/></Box>)}
      </EmployeePage>
    </>
  )
}

export default EditResume;