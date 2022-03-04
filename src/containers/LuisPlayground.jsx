import SideBarTabs from '../components/SideBarTabs';
import AddTemplate from '../containers/AddTemplate'; 
import AddExperience from '../containers/AddExperience'; 
import SectorSelection from '../containers/SectorSelection'; 
import ExperienceTextBox from '../components/TextBox/ExperienceTextBox';
import React from 'react';
import { useState } from 'react';
import { Box , Button} from '@mui/material';

const ent = [{name: "Experience", error: true}, {name: "Education", error: false}, {name: "Summary", error: false}, {name: "Justification", error: false}];
const templates = ["Template 1", "Template 2", "Template 3", "Template 4"];
const locations = ["San Francisco", "Vancouver"];
const divisions = ["D1", "D2"];

const longText = "In up so discovery my middleton eagerness dejection explained. Estimating excellence ye contrasted insensible as. Oh up unsatiable advantages decisively as at interested. Present suppose in esteems in demesne colonel it to. End horrible she landlord screened stanhill. Repeated offended you opinions off dissuade ask packages screened. She alteration everything sympathize impossible his get compliment. Collected few extremity suffering met had sportsman.Smallest directly families surprise honoured am an. Speaking replying mistress him numerous she returned feelings may day. Evening way luckily son exposed get general greatly. Zealously prevailed be arranging do. Set arranging too dejection september happiness. Understood instrument or do connection no appearance do invitation. Dried quick round it or order. Add past see west felt did any. Say out noise you taste merry plate you share. My resolve arrived is we chamber be removal.Sitting mistake towards his few country ask. You delighted two rapturous six depending objection happiness something the. Off nay impossible dispatched partiality unaffected. Norland adapted put ham cordial. Ladies talked may shy basket narrow see. Him she distrusts questions sportsmen. Tolerably pretended neglected on my earnestly by. Sex scale sir style truth ought."


function clickHandler(ev){
  console.log(`clicked ${ev}`);
}

function selectHandler(ev){
  console.log(`selected ${ev}`);
}


function LuisPlayground() {
  const [entries, setEntries] = useState(ent);
  const [createTemplate, setCreateTemplate] = useState(false);
  const [addExperienceSector, setaddExperienceSector] = useState(false);
  const [selectSector, setSelectSector] = useState(false);

    return (
        <div>
          <Button onClick={()=>{setCreateTemplate(true)}}>Create Template</Button>
          <Button onClick={()=>{setaddExperienceSector(true)}}>Add Experience Sector</Button>
          <Button onClick={()=>{setSelectSector(true)}}>Select Sectors</Button>
          <ExperienceTextBox name='Special Contract'location='Vancouver BC' division='Civil' description={longText}></ExperienceTextBox>
          <ExperienceTextBox></ExperienceTextBox>
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
          <SectorSelection entries={[{type:'Projects', sectors:[]},{type:'Experience', sectors:[{key:2132, data:{description:'interesting', imageLink:'aaa.com', division:'D1', location:'Vancouver', name:'Experiencing experience'}}]},{type:'Education', sectors:[{key:2132, data:'middle School'}, {key:123, data:'High School'}, {key:1245, data:'Uni'}]}]} resumeName='Resume Contract name thing' open={selectSector} onClose={() => { setSelectSector(false) }}></SectorSelection>
        </div>
    );
}

export default LuisPlayground;