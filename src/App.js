import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import axios from 'axios';
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

function App() {
  const auth = useAuth();

  if (auth.isAuthenticated) {
    axios.defaults.baseURL = 'https://ae-resume-api.azurewebsites.net/';
    axios.defaults.headers.common['Authorization'] = `Bearer ${auth.user?.access_token}`;
  }

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Navigate to='/employee' replace />} />
        <Route path='/auth/login-callback' element={<Callback />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='employee' element={<RequireAuth><EmployeePage /></RequireAuth>}>
          <Route index element={<Navigate to='/employee/resumes' replace />} />
          <Route path='resumes'>
            <Route index element={<Resumes />} />
            <Route path=':resumeId' element={<Resume />} />
          </Route>
        </Route>
        <Route path='project' element={<RequireAuth><ProjectAdminPage /></RequireAuth>}>
          <Route index element={<Navigate to='/project/workspaces' replace />} />
          <Route path='employees' element={<EmployeeDatabase />} />
          <Route path='workspaces'>
            <Route index element={<ProjectWorkspaces />} />
            <Route path=':workspaceId' element={<EditWorkspace />} />
          </Route>
        </Route>
        <Route path='system' element={<RequireAuth><SystemAdminPage /></RequireAuth>}>
          <Route index element={<Navigate to='/system/templates' replace />} />
          <Route path='employees' element={<EmployeePermissions />} />
          <Route path='templates'>
            <Route index element={<ResumeTemplates />} />
            <Route path=':templateId' element={<EditTemplate />} />
          </Route>
        </Route>
        <Route
          path='*'
          element={
            <div>
              <h1>Page not found!</h1>
            </div>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;

function RequireAuth({ children }) {
  const auth = useAuth();
  let location = useLocation();

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
    return children;
  }

  return <Navigate to='/login' state={{ from: location }} replace />;
}
