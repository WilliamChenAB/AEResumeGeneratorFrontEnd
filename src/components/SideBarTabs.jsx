import React from 'react';
import { useState } from 'react';
import {List, ListItem , ListItemText, Checkbox, ListItemButton} from '@mui/material';
import { Error } from '@mui/icons-material';


/**
 * SideBar Tab component
 * Takes up full width and height of parent container, scrolls when entries dont fit in full height.
 * @param entries array of names managed by parent along with their error status
 * @param color not selected color in hex
 * @param selectedColor selected tab color in hex
 * @param textColor color of text in hex
 * @param showCheckBoxes deciding on whether to show optional checkboxes
 * @param onEntryClick click handler for selection
 * @param onCheckmarkClicked onSelected hanlder for checkboxes
 * @returns SideBarTabs component
 */
function SideBarTabs({entries, showCheckBoxes, color, selectedColor, textColor, onEntryClick, onCheckmarkClicked}){
  const [selectedEntry, setSelectedEntry] = useState(entries[0].name);

  return(
  <List sx={{maxHeight: '100%', overflow: 'auto'}}>
    {
      entries.map(obj => {
        const checkbox = (showCheckBoxes)? <Checkbox key = {obj.name} onChange={onCheckmarkClicked}
        sx={{
          color: textColor,
          '&.Mui-checked': {
            color: textColor,
          },
        }}></Checkbox> : null;
        const icon = (obj.error)? <Error/> : null;
        const usedColor = obj.name === selectedEntry? selectedColor: color;
        return(
          <ListItem key = {obj.name} sx={{background: usedColor, marginBottom: 0.1}} disablePadding>
            <ListItemButton onClick={(ev) => 
              {
                setSelectedEntry(obj.name);
                onEntryClick(obj.name);
              }}>
              {checkbox}
              <ListItemText sx={{ color: textColor, fontWeight: 'bold' }}>
                {obj.name.toUpperCase()}
              </ListItemText>
              {icon}
            </ListItemButton>
        </ListItem>);
      })
    }
  </List>
  );
}

export default SideBarTabs;