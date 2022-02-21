import Split from 'react-split';
import Button from '@mui/material/Button';
import AELogo from './assets/images/ae_logo_blue.png';
import './App.css';
import TopBar from './components/TopBar';

function App() {
  return (
		<div className="App">
			<TopBar buttons={['Resumes', 'Sectors']} roles={['Employee', 'Project Admin', 'System Admin']} />
			<h1>Hello, World!</h1>
			<img src={AELogo} alt='Applied Engineering' />
			<Split className='Split' direction='horizontal' sizes={[70, 30]} minSize={[300, 100]} gutterAlign='center' cursor='col-resize' >
				<div className='my-box'>LEFT SIDE</div>
				<div className='my-box'>RIGHT SIDE</div>
			</Split>
			<Button variant='contained' color='success'>Button Text</Button>
			<br />
			<img src={AELogo} alt='Applied Engineering' />
			<br />
			<img src={AELogo} alt='Applied Engineering' />
			<br />
			<img src={AELogo} alt='Applied Engineering' />
		</div>
	);
}

export default App;
