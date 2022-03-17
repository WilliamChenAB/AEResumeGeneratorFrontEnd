import React from 'react';
import { AppBar, Box, Button, Grid, MenuItem, Select, Toolbar } from '@mui/material';
import AELogoCrop from '../assets/images/ae_logo_blue_cropped.png';
import { Person } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import IconButton from '@mui/material/IconButton';
import DensityMedium from '@mui/icons-material/DensityMedium';
import Menu from '@mui/material/Menu';

/**
 * TopBar component for top navigation bar.
 * @param buttons Array of button objects with properties text, url
 * @param roles Array of role objects for dropdown with properties text, url 
 * @param selectedRole String for text of selected role
 * @returns TopBar component.
 */
function TopBar({ buttons, roles, selectedRole }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const auth = useAuth();

  const handleSignOutClicked = () => {
    auth.removeUser();
    auth.signoutRedirect();
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
          <Box sx={{ mr: 5 }}>
            <Link to='/employee'>
              <Box
                component='img'
                sx={{
                  height: 40,
                  maxHeight: { xs: 150 },
                  maxWidth: { xs: 200 }
                }}
                alt='Associated Engineering'
                src={AELogoCrop}
              />
            </Link>
          </Box>
          <Grid container>
            <Grid xs={1} item md={7}>
              <Box component={Grid} display={{ xs: 'none', lg: 'block' }}>
                {
                  buttons.map(button => {
                    return (
                      <Link to={button.url} key={button.text} style={{ textDecoration: 'none' }}>
                        <Button onClick={() => { }} sx={{ mr: 4, color: 'white' }}>{button.text}</Button>
                      </Link>
                    );
                  })
                }
              </Box>
              <Box component={Grid} display={{ xs: 'block', lg: 'none' }}>
                <IconButton
                  onClick={() => { handleClick() }}
                  size='small'
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                >
                  <DensityMedium />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  id='account-menu'
                  open={open}
                  onClose={() => { handleClose() }}
                  onClick={() => { handleClose() }}
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
                <Select onChange={() => { }} sx={{ mr: 5, color: 'white' }} value={selectedRole} variant='standard'>
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
                <Button onClick={() => { handleSignOutClicked() }} sx={{ color: 'white' }}>Sign Out</Button>
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
