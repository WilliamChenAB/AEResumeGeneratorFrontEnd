import React from 'react';
import { AppBar, Box, Button, MenuItem, Select, Toolbar } from '@mui/material';
import AELogoCrop from '../assets/images/ae_logo_blue_cropped.png';
import { Person } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

function TopBar({ buttons, roles, selectedRole }) {
  const navigate = useNavigate();

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
    // TODO - handle log out here
    navigate('/login');
  }

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Box
            component="img"
            sx={{
              height: 40,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
              mr: 20
            }}
            alt="Associated Engineering"
            src={AELogoCrop}
          />
          <Box sx={{ flexGrow: 1 }}>
            {
              buttons.map(button => {
                return (
                  <Link to={button.url} key={button.text} style={{ textDecoration: 'none' }}>
                    <Button onClick={e => handleMenuButtonClicked(button)} sx={{ mr: 5, color: 'white' }}>{button.text}</Button>
                  </Link>
                );
              })
            }
          </Box>

          <Box>
            <Person sx={{ verticalAlign: 'middle' }} />
            <Select onChange={handleChange} sx={{ mr: 5, color: 'white' }} value={selectedRole} variant='standard'>
              {
                roles.map(role => {
                  return (
                    <MenuItem key={role.text} value={role.text}>
                      <Link to={role.url} style={{ textDecoration: 'none', color: 'inherit' }}>{role.text}</Link>
                    </MenuItem>
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