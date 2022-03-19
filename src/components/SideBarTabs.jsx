import { useState } from 'react';
import { List, ListItem, ListItemText, Checkbox, ListItemButton, Tooltip } from '@mui/material';
import { Error } from '@mui/icons-material';

/**
 * SideBar Tab component
 * Takes up full width and height of parent container, scrolls when entries don't fit in full height.
 * @param entries array of names managed by parent along with their error status
 * @param color not selected color in hex
 * @param selectedColor selected tab color in hex
 * @param textColor color of text in hex
 * @param showCheckBoxes deciding on whether to show optional checkboxes
 * @param onEntryClick click handler for selection
 * @param onCheckmarkClicked onSelected hanlder for checkboxes
 * @returns SideBarTabs component
 */
function SideBarTabs({ entries, showCheckBoxes, color, selectedColor, textColor, onEntryClick, onCheckmarkClicked }) {
  const [selectedEntry, setSelectedEntry] = useState(0);

  return (
    <List sx={{ flexGrow: 500, maxHeight: '100%', overflow: 'auto' }}>
      {entries.map((obj, index) => {
        const checkbox = showCheckBoxes && <Checkbox key={obj.name} onChange={onCheckmarkClicked}
          sx={{
            color: textColor,
            '&.Mui-checked': {
              color: textColor,
            },
          }} />;
        const usedColor = index === selectedEntry ? selectedColor : color;
        return (
          <ListItem key={obj.name} sx={{ background: usedColor, marginBottom: 0.1 }} disablePadding>
            <ListItemButton onClick={(ev) => {
              setSelectedEntry(index);
              onEntryClick(index);
            }}>
              {checkbox}
              <ListItemText sx={{ color: textColor, fontWeight: 'bold' }}>
                {obj.name.toUpperCase()}
              </ListItemText>
              {obj.error &&
                <Tooltip title='Required from template' placement='right'>
                  <Error />
                </Tooltip>
              }
            </ListItemButton>
          </ListItem>);
      })
      }
    </List>
  );
}

export default SideBarTabs;