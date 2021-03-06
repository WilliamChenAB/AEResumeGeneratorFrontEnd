import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import PermissionsTable from '../../components/Table/PermissionsTable';
import SearchBar from '../../components/SearchBar';
import axios from 'axios';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import ConfirmAccessChange from '../../containers/ConfirmAccessChange';
import AlertPopup from '../../components/AlertPopup';
import { useDispatch, useSelector } from 'react-redux';
import { userSelectors, userActions } from '../../slices/userSlice';
import { useNavigate } from 'react-router-dom';


const createRow = (data) => {
  return { name: data.name, id: data.employeeId, role: data.jobTitle, access: data.access, email: data.email }
}

function EmployeePermissions() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [rows, setRows] = useState([]);
  const [openCompleteMessage, setOpenCompleteMessage] = useState(false);
  const [employee, setEmployee] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newAccess, setNewAccess] = useState(0);

  const selfEmployeeID = useSelector(userSelectors.getEid);
  const SYS_ADMIN_ACCESS_NUM = 2;
  const PROJ_ADMIN_ACCESS_NUM = 1;


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
      if (id === selfEmployeeID) {
        dispatch(userActions.editAccess(accessNum));
        if (accessNum !== SYS_ADMIN_ACCESS_NUM) {
          redirectAccessPage(accessNum);
        }
      } else {
        getAllUserPermissions();
      }
    }).catch((error) => {
      setIsLoading(false);
      setErrorStatus(error.response);
    });
  }

  const redirectAccessPage = (accessNum) => {
    if (accessNum === PROJ_ADMIN_ACCESS_NUM) {
      navigate('/project/workspaces', { replace: true });
    }
    else {
      navigate('/employee/resumes', { replace: true });
    }
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
        {isLoading && <Loading text='Loading Permissions...' />}
        {!isLoading && errorStatus && <Error text='Error retrieving permissions.' response={errorStatus}></Error>}
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