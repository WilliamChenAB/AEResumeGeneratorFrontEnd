import React from 'react';
import { AppBar, Box, Button, Grid, MenuItem, Select, Toolbar } from '@mui/material';
import AELogoCrop from '../assets/images/ae_logo_blue_cropped.png';
import { Person } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import DensityMedium from '@mui/icons-material/DensityMedium';
import Menu from '@mui/material/Menu';

function TopBar({ buttons, roles, selectedRole }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Box
            component="img"
            sx={{
              height: 40,
              maxHeight: { xs: 150 },
              maxWidth: { xs: 200 },
              mr: 5
            }}
            alt="Associated Engineering"
            src={AELogoCrop}
          />
          <Grid container>
            <Grid xs={1} item md={7}>
              <Box component={Grid} display={{ xs: 'none', lg: 'block' }}>
                {
                  buttons.map(button => {
                    return (
                      <Link to={button.url} key={button.text} style={{ textDecoration: 'none' }}>
                        <Button onClick={e => handleMenuButtonClicked(button)} sx={{ mr: 4, color: 'white' }}>{button.text}</Button>
                      </Link>
                    );
                  })
                }
              </Box>
              <Box component={Grid} display={{ xs: 'block', lg: 'none' }}>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <DensityMedium />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                >
                  {
                    buttons.map(button => {
                      return (
                        <MenuItem key={button.text} value={button.text} component={Link} to={button.url}>
                          {button.text}
                        </MenuItem>
                      );
                    })
                  }
                </Menu>

              </Box>
            </Grid>
            <Grid item xs={11} md={5}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Person sx={{ verticalAlign: 'middle' }} />
                <Select onChange={handleChange} sx={{ mr: 5, color: 'white' }} value={selectedRole} variant='standard'>
                  {
                    roles.map(role => {
                      return (
                        <MenuItem key={role.text} value={role.text} component={Link} to={role.url}>
                          {role.text}
                        </MenuItem>
                      );
                    })
                  }
                </Select>
                <Button onClick={handleSignOutClicked} sx={{ color: 'white' }}>Sign Out</Button>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default TopBar;
