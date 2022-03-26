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
  return { name: data.name, id: data.eid, role: data.jobTitle, access: data.access }
}

function EmployeePermissions() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [employee, setEmployee] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newAccess, setNewAccess] = useState(0);
  // 

  const getAllUserPermissions = () => {
    setIsLoading(true);
    setErrorStatus(false);
    axios.get('/Admin/GetAllEmployees').then((response) => {
      setEmployees(response.data.map((data) => createRow(data)));
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

    axios.post('/Admin/AssignAccess', null, {
      params: {
        EID: id,
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
          <Box mb={4} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Box sx={{ flexGrow: 1, alignItems: 'flex-end' }}>
              <Typography variant='h3'>EMPLOYEE PERMISSIONS</Typography>
            </Box>
            <SearchBar placeholder='Search Database' onChange={() => { }}></SearchBar>
          </Box>
          <PermissionsTable rows={employees} onEditPermission={editEmployeeAccess} />
        </>}
      </Box>
    </Box >
  )
}

export default EmployeePermissions;