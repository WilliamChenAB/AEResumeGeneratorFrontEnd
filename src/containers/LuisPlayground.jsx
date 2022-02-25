import SideBarTabs from '../components/SideBarTabs';
import AddTemplate from '../containers/AddTemplate'; 
import AddExperience from '../containers/AddExperience'; 
import React from 'react';
import { useState } from 'react';
import { Box , Button} from '@mui/material';

const ent = [{name: "Experience", error: true}, {name: "Education", error: false}, {name: "Summary", error: false}, {name: "Justification", error: false}];
const templates = ["Template 1", "Template 2", "Template 3", "Template 4"];
const locations = ["San Francisco", "Vancouver"];
const divisions = ["D1", "D2"];


function clickHandler(ev){
  console.log(`clicked }`);
}

function selectHandler(ev){
  console.log(`selected ${ev}`);
}


function LuisPlayground() {
  const [entries, setEntries] = useState(ent);
  const [createTemplate, setCreateTemplate] = useState(false);
  const [addExperienceSector, setaddExperienceSector] = useState(false);

    return (
        <div>
          <Button onClick={()=>{setCreateTemplate(true)}}>Create Template</Button>
          <Button onClick={()=>{setaddExperienceSector(true)}}>Add Experience Sector</Button>
          <Box sx={{width: 500, height: 200}}>
            <SideBarTabs 
                entries={entries} 
                showCheckBoxes={true} 
                color='#87C34B' 
                selectedColor='#00569C' 
                textColor='white'
                onEntryClick={clickHandler}
                onCheckmarkClicked={selectHandler}/>
          </Box>
          <AddTemplate templates={templates} open={createTemplate} onClose={() => { setCreateTemplate(false) }} />
          <AddExperience divisions={divisions} locations={locations} open={addExperienceSector} onClose={() => { setaddExperienceSector(false) }}></AddExperience>
        </div>
    );
}

export default LuisPlayground;