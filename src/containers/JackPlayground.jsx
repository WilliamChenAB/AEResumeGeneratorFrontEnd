import AddButton from '../components/AddButton';
import SearchBar from '../components/SearchBar';
import Dropdown from '../components/Dropdown';
import Profile from '../components/Profile';
import AELogo from '../assets/images/ae_logo_blue.png';

function JackPlayground() {
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
    </div>
  );
}

export default JackPlayground;