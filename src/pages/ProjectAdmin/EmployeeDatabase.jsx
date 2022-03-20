import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import EmployeeSearchTable from '../../components/Table/EmployeeSearchTable';
import SearchBar from '../../components/SearchBar';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import axios from 'axios';


function EmployeeDatabase() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [data, setData] = useState([]); // full data
  const [rows, setRows] = useState([]); // rows to display in table (with filter applied)

  useEffect(() => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Admin/GetAllEmployees').then((response) => {
      const responseData = response.data.map((employee) => {
        return {
          id: employee.eid,
          name: `${employee.name}`, // force name to be string
          role: employee.access
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
    <Box className='content-section-margins'>
      {isLoading && <Loading text='Loading Employees...' />}
      {!isLoading && errorStatus && <Error text='Error retrieving employee info.' response={errorStatus}></Error>}
      {!isLoading && !errorStatus &&
        <>
          <Box mb={4} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flexGrow: 1, alignItems: 'flex-end' }}>
              <Typography variant='h3'>EMPLOYEE DATABASE</Typography>
            </Box>
            <SearchBar placeholder='Search Employee Database' onChange={(value) => { tableFilter(value) }}></SearchBar>
          </Box>
          <EmployeeSearchTable rows={rows} />
        </>
      }
    </Box>
  )
}

export default EmployeeDatabase;