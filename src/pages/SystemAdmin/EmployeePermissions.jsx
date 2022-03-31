import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import PermissionsTable from '../../components/Table/PermissionsTable';
import SearchBar from '../../components/SearchBar';
import axios from 'axios';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import ConfirmAccessChange from '../../containers/ConfirmAccessChange';
import AlertPopup from '../../components/AlertPopup';

const createRow = (data) => {
  return { name: data.name, id: data.employeeId, role: data.jobTitle, access: data.access, email: data.email }
}

function EmployeePermissions() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [rows, setRows] = useState([]);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [employee, setEmployee] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newAccess, setNewAccess] = useState(0);

  const getAllUserPermissions = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Employee/GetAll').then((response) => {
      setEmployees(response.data.map((data) => createRow(data)));
      setRows(response.data.map((data) => createRow(data)));
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  useEffect(() => {
    getAllUserPermissions();
  }, []);

  const saveEmployeeAccess = (id, accessNum) => {
    setShowEditDialog(false);
    setIsLoading(true);
    setErrorStatus(false);

    axios.post('/Employee/AssignAccess', null, {
      params: {
        employeeId: id,
        access: accessNum,
      }
    }).then((response) => {
      getAllUserPermissions();
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  const editEmployeeAccess = (employee, newAccess) => {
    setEmployee(employee);
    setNewAccess(newAccess);
    setShowEditDialog(true);
  }

  const tableFilter = (value) => {
    const filteredRows = employees.filter((row) => {
      return String(row.name).toLowerCase().includes(value.toLowerCase()) || String(row.email).toLowerCase().includes(value.toLowerCase()) || String(row.role).toLowerCase().includes(value.toLowerCase());
    });
    setRows(filteredRows);
  }

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {openCompleteMessage &&
        <AlertPopup type={openCompleteMessage.type} open onClose={() => { setOpenCompleteMessage(false) }}>
          {openCompleteMessage.text}
        </AlertPopup>
      }
      <ConfirmAccessChange name={employee.name} oldAccess={employee.access} newAccess={newAccess} open={showEditDialog} onClose={() => { setShowEditDialog(false) }} onConfirm={() => saveEmployeeAccess(employee.id, newAccess)} isEditing={isEditing} />
      <Box sx={{ flexGrow: 1 }} className='content-section-margins'>
        {isLoading && <Loading text='Loading Templates...' />}
        {!isLoading && errorStatus && <Error text='Error retrieving templates.' response={errorStatus}></Error>}
        {!isLoading && !errorStatus && <>
          <Typography variant='h3'>EMPLOYEE PERMISSIONS</Typography>
          <br />
          <br />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box mb={1} sx={{ width: '40%' }}>
              <SearchBar placeholder='Search Employees' onChange={(value) => { tableFilter(value) }}></SearchBar>
            </Box>
          </Box>
          <PermissionsTable rows={rows} onEditPermission={editEmployeeAccess} />
        </>}
      </Box>
    </Box >
  )
}

export default EmployeePermissions;