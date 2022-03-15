import { Box, Typography } from '@mui/material';
import PermissionsTable from '../../components/Table/PermissionsTable';
import SearchBar from '../../components/SearchBar';
import { mockEmployeePermissions } from './__mocks__/mockEmployeePermissions';

function EmployeePermissions() {
  return (
    <Box className='content-section-margins'>
      <Box mb={4}sx={{display: 'flex', flexDirection: 'row'}}>
          <Box sx={{flexGrow:1, alignItems:'flex-end'}}>
            <Typography variant='h3'>EMPLOYEE PERMISSIONS</Typography>
          </Box>
          <SearchBar placeholder='Search Database' onChange={()=>{}}></SearchBar>
      </Box>
      <PermissionsTable rows={mockEmployeePermissions}/>
    </Box>
  )
}

export default EmployeePermissions;