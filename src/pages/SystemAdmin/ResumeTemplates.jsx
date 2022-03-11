import { Box, Typography } from '@mui/material';
import AddButton from '../../components/AddButton';
import TemplateTable from '../../components/Table/TemplateTable';

function ResumeTemplates() {
  return (
    <Box className='content-section-margins'>
      <Box mb={4}>
        <Typography variant='h3'>RESUME TEMPLATES</Typography>
      </Box>
      <AddButton text='Add Template' />
      <TemplateTable />
    </Box>
  )
}

export default ResumeTemplates;