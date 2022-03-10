import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/Login';
import EmployeeResume from './pages/Employee/EmployeeResume';
import EditResume from './pages/Employee/EditResume';
import ProjectAdminPage from './pages/ProjectAdmin/ProjectAdminPage';
import ProjectWorkspaces from './pages/ProjectAdmin/ProjectWorkspaces';
import EmployeeDatabase from './pages/ProjectAdmin/EmployeeDatabase';
import EditWorkspace from './pages/ProjectAdmin/EditWorkspace';
import SystemAdminPage from './pages/SystemAdmin/SystemAdminPage';
import ResumeTemplates from './pages/SystemAdmin/ResumeTemplates';
import EmployeePermissions from './pages/SystemAdmin/EmployeePermissions';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<RequireAuth><EmployeeResume /></RequireAuth>} />
        <Route path='login' element={<LoginPage />} />
        <Route path='employee'>
          <Route index element={<Navigate to='/employee/resumes' replace />} />
          <Route path='resumes' element={<RequireAuth><EmployeeResume /></RequireAuth>} />
          <Route path='sectors' element={<RequireAuth><EditResume /></RequireAuth>} />
        </Route>
        <Route path='project' element={<RequireAuth><ProjectAdminPage /></RequireAuth>}>
          <Route index element={<Navigate to='/project/workspaces' replace />} />
          <Route path='workspaces' element={<RequireAuth><ProjectWorkspaces /></RequireAuth>} />
          <Route path='employees' element={<RequireAuth><EmployeeDatabase /></RequireAuth>} />
          <Route path='editWorkspace' element={<RequireAuth><EditWorkspace /></RequireAuth>} />
        </Route>
        <Route path='system' element={<RequireAuth><SystemAdminPage /></RequireAuth>}>
          <Route index element={<Navigate to='/system/templates' replace />} />
          <Route path='templates' element={<RequireAuth><ResumeTemplates /></RequireAuth>} />
          <Route path='employees' element={<RequireAuth><EmployeePermissions /></RequireAuth>} />
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
