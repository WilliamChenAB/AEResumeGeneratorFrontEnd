import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/Login';
import EmployeePage from './pages/Employee/EmployeePage';
import Resumes from './pages/Employee/Resumes';
import Resume from './pages/Employee/Resume';
import Sectors from './pages/Employee/Sectors';
import ProjectAdminPage from './pages/ProjectAdmin/ProjectAdminPage';
import ProjectWorkspaces from './pages/ProjectAdmin/ProjectWorkspaces';
import EmployeeDatabase from './pages/ProjectAdmin/EmployeeDatabase';
import EditWorkspace from './pages/ProjectAdmin/EditWorkspace';
import SystemAdminPage from './pages/SystemAdmin/SystemAdminPage';
import ResumeTemplates from './pages/SystemAdmin/ResumeTemplates';
import EmployeePermissions from './pages/SystemAdmin/EmployeePermissions';
import EditTemplate from './pages/SystemAdmin/EditTemplate';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Navigate to='/employee' replace />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='employee' element={<RequireAuth><EmployeePage /></RequireAuth>}>
          <Route index element={<Navigate to='/employee/resumes' replace />} />
          <Route path='resumes'>
            <Route index element={<RequireAuth><Resumes /></RequireAuth>} />
            <Route path=':resumeId' element={<RequireAuth><Resume /></RequireAuth>} />
          </Route>
          <Route path='sectors' element={<RequireAuth><Sectors /></RequireAuth>} />
        </Route>
        <Route path='project' element={<RequireAuth><ProjectAdminPage /></RequireAuth>}>
          <Route index element={<Navigate to='/project/workspaces' replace />} />
          <Route path='employees' element={<RequireAuth><EmployeeDatabase /></RequireAuth>} />
          <Route path='workspaces'>
            <Route index element={<RequireAuth><ProjectWorkspaces /></RequireAuth>} />
            <Route path=':workspaceId' element={<RequireAuth><EditWorkspace /></RequireAuth>} />
          </Route>
        </Route>
        <Route path='system' element={<RequireAuth><SystemAdminPage /></RequireAuth>}>
          <Route index element={<Navigate to='/system/templates' replace />} />
          <Route path='employees' element={<RequireAuth><EmployeePermissions /></RequireAuth>} />
          <Route path='templates'>
            <Route index element={<RequireAuth><ResumeTemplates /></RequireAuth>} />
            <Route path=':templateId' element={<RequireAuth><EditTemplate /></RequireAuth>} />
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
  let auth = true; // TODO - replace this with actual auth status
  let location = useLocation();

  if (!auth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
}
