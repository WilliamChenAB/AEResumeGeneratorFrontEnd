import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ResumeSeleciton from '../../containers/ResumeSelection';
import EmployeeSearchTable from '../../components/Table/EmployeeSearchTable';
import SearchBar from '../../components/SearchBar';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import axios from 'axios';
import SectorSelection from '../../containers/SectorSelection';

function EmployeeDatabase() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [data, setData] = useState([]); // full data
  const [rows, setRows] = useState([]); // rows to display in table (with filter applied)
  const [openResumeSelection, setOpenResumeSelection] = useState(false);
  const [openSectorSelection, setOpenSectorSelection] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Employee/GetAll').then((response) => {
      const responseData = response.data.map((employee) => {
        return {
          id: employee.employeeId,
          name: employee.name,
          role: employee.jobTitle,
          email: employee.email,
        };
      });
      setData(responseData);
      setRows(responseData);
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }, []);

  const tableFilter = (value) => {
    const filteredRows = data.filter((row) => {
      return row.name.toLowerCase().includes(value.toLowerCase());
    });
    setRows(filteredRows);
  }

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
        {isLoading && <Loading text='Loading Employees...' />}
        {!isLoading && errorStatus && <Error text='Error retrieving employee info.' response={errorStatus}></Error>}
        {!isLoading && !errorStatus &&
          <>
            {selectedEmployee && <ResumeSeleciton submittable={false} open={openResumeSelection} employeeName={selectedEmployee.name} employeeId={selectedEmployee.employeeId} onSubmit={(resumeId) => { }} onClose={() => { setOpenResumeSelection(false) }} />}
            {selectedEmployee && <SectorSelection submittable={false} targetEid={selectedEmployee.employeeId} title={selectedEmployee.name} open={openSectorSelection} onClose={() => { setOpenSectorSelection(false) }} onSubmit={() => { }} />}
            <Typography variant='h3'>EMPLOYEE DATABASE</Typography>
            <br />
            <br />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ width: '40%' }}>
                <SearchBar placeholder='Search Employee Database' onChange={(value) => { tableFilter(value) }}></SearchBar>
              </Box>
            </Box>
            <EmployeeSearchTable rows={rows} sectorsClicked={(employeeId, name) => { setSelectedEmployee({ employeeId: employeeId, name: name }); setOpenSectorSelection(true) }} resumesClicked={(employeeId, name) => { setSelectedEmployee({ employeeId: employeeId, name: name }); setOpenResumeSelection(true) }} />
          </>
        }
      </Box>
    </Box>
  )
}

export default EmployeeDatabase;