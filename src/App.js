import { useEffect, useState } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { User } from 'oidc-client-ts';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, userSelectors } from './slices/userSlice';
import LoginPage from './pages/Login';
import EmployeePage from './pages/Employee/EmployeePage';
import Resumes from './pages/Employee/Resumes';
import Resume from './pages/Employee/Resume';
import ProjectAdminPage from './pages/ProjectAdmin/ProjectAdminPage';
import ProjectWorkspaces from './pages/ProjectAdmin/ProjectWorkspaces';
import EmployeeDatabase from './pages/ProjectAdmin/EmployeeDatabase';
import EditWorkspace from './pages/ProjectAdmin/EditWorkspace';
import SystemAdminPage from './pages/SystemAdmin/SystemAdminPage';
import ResumeTemplates from './pages/SystemAdmin/ResumeTemplates';
import EmployeePermissions from './pages/SystemAdmin/EmployeePermissions';
import EditTemplate from './pages/SystemAdmin/EditTemplate';
import Callback from './auth/Callback';
import oidcConfig from './auth';
import PageNotFound from './pages/PageNotFound';
import Loading from './components/Loading';
import Error from './components/Error';

function App() {
  const auth = useAuth();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);

  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
  axios.interceptors.request.use((config) => {
    const oidcStorage = sessionStorage.getItem(`oidc.user:${oidcConfig.authority}:${oidcConfig.client_id}`);
    if (oidcStorage) {
      config.headers.Authorization = `Bearer ${User.fromStorageString(oidcStorage).access_token}`;
    }
    return config;
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      setIsLoading(true);
      setErrorStatus(false);
      axios.get('/Employee/GetSelf').then((response) => {
        const userObj = {
          employeeId: response.data.employeeId,
          access: response.data.access,
          name: response.data.name,
          title: response.data.jobTitle,
          email: response.data.email,
        };
        dispatch(userActions.setUser(userObj));
        setIsLoading(false);
      }).catch((error) => {
        dispatch(userActions.resetUser());
        setIsLoading(false);
        setErrorStatus(error.response);
      });
    } else {
      dispatch(userActions.resetUser());
    }
  }, [auth.isAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: '100vh' }}>
        {isLoading && <Loading text='Loading Application...' />}
        {!isLoading && errorStatus && <Error text='Error loading application.' response={errorStatus}></Error>}
        {!isLoading && !errorStatus &&
          <Routes>
            <Route path='/' element={<Navigate to='/employee' replace />} />
            <Route path='/auth/login-callback' element={<Callback />} />
            <Route path='login' element={<LoginPage />} />
            <Route path='employee' element={<RequireAuth access={0}><EmployeePage /></RequireAuth>}>
              <Route index element={<Navigate to='/employee/resumes' replace />} />
              <Route path='resumes'>
                <Route index element={<Resumes />} />
                <Route path=':resumeId' element={<Resume />} />
              </Route>
            </Route>
            <Route path='project' element={<RequireAuth access={1}><ProjectAdminPage /></RequireAuth>}>
              <Route index element={<Navigate to='/project/workspaces' replace />} />
              <Route path='employees' element={<EmployeeDatabase />} />
              <Route path='workspaces'>
                <Route index element={<ProjectWorkspaces />} />
                <Route path=':workspaceId' element={<EditWorkspace />} />
              </Route>
            </Route>
            <Route path='system' element={<RequireAuth access={2}><SystemAdminPage /></RequireAuth>}>
              <Route index element={<Navigate to='/system/templates' replace />} />
              <Route path='employees' element={<EmployeePermissions />} />
              <Route path='templates'>
                <Route index element={<ResumeTemplates />} />
                <Route path=':templateId' element={<EditTemplate />} />
              </Route>
            </Route>
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        }
      </Box>
    </ThemeProvider>
  );
}

export default App;

function RequireAuth({ children, access = 0 }) {
  const auth = useAuth();
  let location = useLocation();
  const role = useSelector(userSelectors.getAccess);

  if (auth.activeNavigator === 'signinSilent') {
    return <div>Signing you in...</div>;
  } else if (auth.activeNavigator === 'signoutRedirect') {
    return <div>Signing you out...</div>;
  }

  if (auth.isLoading) {
    return <div>Authentication loading...</div>;
  }

  if (auth.error) {
    return <div>Oops... there was an unexpected authentication error: {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    if (role === -1) {
      return <div>Loading...</div>
    }

    if ((access === 0 && role >= 0) || (access === 1 && role >= 1) || (access === 2 && role >= 2)) {
      return children;
    }
    return <PageNotFound />
  }

  return <Navigate to='/login' state={{ from: location }} replace />;
}
