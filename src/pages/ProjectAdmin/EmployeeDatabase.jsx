import { Box, Typography } from '@mui/material';
import EmployeeSearchTable from '../../components/Table/EmployeeSearchTable';

function EmployeeDatabase() {
  return (
    <>
      <Box mb={4}>
        <Typography variant='h3'>EMPLOYEE DATABASE</Typography>
      </Box>
      <EmployeeSearchTable />
    </>
  )
}

export default EmployeeDatabase;