import { Box, Typography } from '@mui/material';
import SideBar from '../../containers/SideBar';
import AddButton from '../../components/AddButton';
import TemplateTable from '../../components/Table/TemplateTable';

function ResumeTemplates() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <SideBar />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Box mb={4}>
            <Typography variant='h3'>RESUME TEMPLATES</Typography>
          </Box>
          <AddButton text='Add Template' />
          <TemplateTable />
        </Box>
      </Box>
    </>
  )
}

export default ResumeTemplates;