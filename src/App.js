import Split from 'react-split';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme/theme';
import AELogo from './assets/images/ae_logo_blue.png';
import './App.css';
import TopBar from './components/TopBar';
import JackPlayground from './containers/JackPlayground';
import NerinePlayground from './containers/NerinePlayground';
import LuisPlayground from './containers/LuisPlayground';
import EmployeeResume from './pages/Employee/EmployeeResume';

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
			<EmployeeResume />
		</ThemeProvider>
	);
}

export default App;
