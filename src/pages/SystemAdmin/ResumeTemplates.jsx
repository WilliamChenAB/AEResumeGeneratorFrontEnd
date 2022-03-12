import { Box, Typography } from '@mui/material';
import AddButton from '../../components/AddButton';
import TemplateTable from '../../components/Table/TemplateTable';
import SearchBar from '../../components/SearchBar';

function ResumeTemplates() {
  return (
    <Box className='content-section-margins'>
      <Box mb={4} sx={{display: 'flex', flexDirection: 'row'}}>
        <Box sx={{flexGrow:1, alignItems:'flex-end'}}>
          <Typography variant='h3'>RESUME TEMPLATES</Typography>
        </Box>
        <SearchBar placeholder='Search Employee Database' onChange={()=>{}}></SearchBar>
      </Box>
      <AddButton text='Add Template' />
      <TemplateTable />
    </Box>
  )
}

export default ResumeTemplates;