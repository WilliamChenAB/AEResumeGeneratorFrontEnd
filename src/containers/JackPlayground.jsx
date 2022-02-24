import { useState } from 'react';
import { Button } from '@mui/material';
import AddButton from '../components/AddButton';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';
import Profile from '../components/Profile';
import AELogo from '../assets/images/ae_logo_blue.png';
import Login from './Login';
import AddWorkspace from './AddWorkspace';

function JackPlayground() {
  const [openAddWorkspace, setOpenAddWorkspace] = useState(false);

  return (
    <div>
      <AddButton text='Add Workspace'></AddButton>
      <br />
      <SearchBar placeholder='Search...'></SearchBar>
      <br />
      <Dropdown label='Resume Template' required options={['a', 'b', 'c', 'd', 'e']}></Dropdown>
      <br />
      <Dropdown label='Not Required Dropdown' options={['a', 'b', 'c', 'd', 'e']}></Dropdown>
      <br />
      <Profile title='37th Street SW Storm Trunk Relocation Contract' picture={AELogo}></Profile>
      <Profile title='37th Street SW Storm Trunk Relocation Contract with No Picture'></Profile>
      <br />
      <Login></Login>
      <br />
      <Button onClick={() => { setOpenAddWorkspace(true) }}>Open Add Workspace Dialog</Button>
      <AddWorkspace open={openAddWorkspace} onClose={() => { setOpenAddWorkspace(false) }} />
    </div>
  );
}

export default JackPlayground;