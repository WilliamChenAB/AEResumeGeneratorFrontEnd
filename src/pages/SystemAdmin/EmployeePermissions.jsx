import { Box, Typography } from '@mui/material';
import PermissionsTable from '../../components/Table/PermissionsTable';

function EmployeePermissions() {
  return (
    <>
      <Box mb={4}>
        <Typography variant='h3'>EMPLOYEE PERMISSIONS</Typography>
      </Box>
      <PermissionsTable />
    </>
  )
}

export default EmployeePermissions;