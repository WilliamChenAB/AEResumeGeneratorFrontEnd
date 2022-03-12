import { Box, Typography } from '@mui/material';
import EmployeeSearchTable from '../../components/Table/EmployeeSearchTable';
import SearchBar from '../../components/SearchBar';

function EmployeeDatabase() {
  return (
    <Box className='content-section-margins'>
      <Box mb={4} sx={{display: 'flex', flexDirection: 'row'}}>
        <Box sx={{flexGrow:1, alignItems:'flex-end'}}>
          <Typography variant='h3'>EMPLOYEE DATABASE</Typography>
        </Box>
        <SearchBar placeholder='Search Employee Database' onChange={()=>{}}></SearchBar>
      </Box>
      <EmployeeSearchTable />
    </Box>
  )
}

export default EmployeeDatabase;