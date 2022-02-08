import React from 'react';
import Split from 'react-split';
import Button from '@mui/material/Button';
import './App.css';

function App() {
	return (
		<div className="App">
			<h1>Hello, World!</h1>
			<Split className='Split' direction='horizontal' sizes={[70, 30]} minSize={[300, 100]} gutterAlign='center' cursor='col-resize' >
				<div className='my-box'>LEFT SIDE</div>
				<div className='my-box'>RIGHT SIDE</div>
			</Split>
			<Button variant='contained' color='success'>Button Text</Button>
		</div>
	);
}

export default App;