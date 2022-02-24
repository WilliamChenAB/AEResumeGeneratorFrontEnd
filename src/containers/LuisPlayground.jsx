import SideBarTabs from '../components/SideBarTabs';
import React from 'react';
import { useState } from 'react';
import { Box } from '@mui/material';

const ent = [{name: "Experience", error: true}, {name: "Education", error: false}, {name: "Summary", error: false}, {name: "Justification", error: false}];

function clickHandler(ev){
  console.log(`clicked }`);
}

function selectHandler(ev){
  console.log(`selected ${ev}`);
}


function LuisPlayground() {
  const [entries, setEntries] = useState(ent);
    return (
        <div>
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
        </div>
    );
}

export default LuisPlayground;