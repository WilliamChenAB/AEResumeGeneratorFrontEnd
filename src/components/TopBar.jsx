import React from 'react';
import { AppBar, Box, Button, MenuItem, Select, Toolbar } from '@mui/material';
import AELogo from '../assets/images/ae_logo_blue.png';
import { Person } from '@mui/icons-material';

function TopBar({ buttons, roles }) {
	// this is just a placeholder file. delete this if we don't end up using it!
	return (
		<div>
			<AppBar>
				<Toolbar>
					<Box component='img' sx={{ height: 1 / 30, width: 1 / 30 }} alt='Associated Engineering' src={AELogo} />
					<Box sx={{ flexGrow: 1 }}>
						{
							buttons.map(button => {
								return (
									<Button sx={{ color: 'white' }}>{button}</Button>
								);
							})
						}
					</Box>

					<Box>
						<Person sx={{ verticalAlign: 'middle' }} />
						<Select sx={{ color: 'white' }} defaultValue='Employee' variant='standard'>
							{
								roles.map(role => {
									return (
										<MenuItem key={role} value={role}>{role}</MenuItem>
									);
								})
							}
						</Select>
						<Button sx={{ color: 'white' }}>Sign Out</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<Toolbar />
		</div>
	);
}

export default TopBar;