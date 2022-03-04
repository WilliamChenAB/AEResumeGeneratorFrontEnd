import Split from 'react-split';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import AELogo from './assets/images/ae_logo_blue.png';
import './App.css';
import TopBar from './components/TopBar';
import JackPlayground from './containers/JackPlayground';
import NerinePlayground from './containers/NerinePlayground';
import LuisPlayground from './containers/LuisPlayground';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/Login';
import EmployeeResume from './pages/Employee/EmployeeResume';
import EditResume from './pages/Employee/EditResume';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {/* <TopBar buttons={['Resumes', 'Sectors']} roles={['Employee', 'Project Admin', 'System Admin']} /> */}
        {/* <h1>Hello, World!</h1>
				<img src={AELogo} alt='Applied Engineering' />
				<Split className='Split' direction='horizontal' sizes={[70, 30]} minSize={[300, 100]} gutterAlign='center' cursor='col-resize' >
					<div className='my-box'>LEFT SIDE</div>
					<div className='my-box'>RIGHT SIDE</div>
				</Split>
				<JackPlayground />
				<NerinePlayground />
				<LuisPlayground /> */}
      </div>
      <Routes>
        <Route path='/' element={<RequireAuth><EmployeeResume /></RequireAuth>} />
        <Route path='login' element={<LoginPage />} />
        <Route path='resumes' element={<RequireAuth><EmployeeResume /></RequireAuth>} />
        <Route path='sectors' element={<RequireAuth><EditResume /></RequireAuth>} />
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