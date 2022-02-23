import React from 'react';
import { AppBar, Box, Button, MenuItem, Select, Toolbar } from '@mui/material';
import AELogoCrop from '../assets/images/ae_logo_blue_cropped.png';
import { Person } from '@mui/icons-material';

function TopBar({ buttons, roles }) {

  //Not sure if we should just use Jack's dropdown or if its fine to handle it differently because its only in 1 place
  //might be best to just use a set of values for both that have each their own functions instead of passing it in

  const handleChange = (ev) => {
    // This function should probably end up calling another function that's passed in as a prop handling each element.
    console.log(`Dropdown option changed to ${ev.target.value}`);
  }

  const handleMenuButtonClicked = (btnName) => {
    // This function should probably end up calling another function that's passed in as a prop handling each element.
    console.log(`Top menu button clicked: ${btnName}`);
  }

  const handleSignOutClicked = () => {
    //add sign out logic?
   console.log(`Sign out clicked`);
  }

  // this is just a placeholder file. delete this if we don't end up using it!
  return (
    <div>
      <AppBar>
        <Toolbar>
          <Box component='img' sx={{ width: 50}} alt='Associated Engineering' src={AELogoCrop} />
          <Box sx={{ flexGrow: 1}}>
            {
              buttons.map(button => {
                return (
                  <Button onClick={e => handleMenuButtonClicked(button)} key={button} sx={{ color: 'white' }}>{button}</Button>
                );
              })
            }
          </Box>

          <Box>
            <Person sx={{ verticalAlign: 'middle' }} />
            <Select onChange={handleChange} sx={{ color: 'white' }} defaultValue='Employee' variant='standard'>
              {
                roles.map(role => {
                  return (
                    <MenuItem key={role} value={role}>{role}</MenuItem>
                  );
                })
              }
            </Select>
            <Button onClick={handleSignOutClicked} sx={{ color: 'white' }}>Sign Out</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default TopBar;