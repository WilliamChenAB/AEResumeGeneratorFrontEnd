import { useState } from 'react';
import { IconButton, Input, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

/**
 * Search bar component with placeholder text and search button/icon.
 * Takes up full width of parent container.
 * @param placeholder Placeholder text to display in search bar when there is no text
 * @returns SearchBar component
 */
function SearchBar({ placeholder }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (ev) => {
    setSearchTerm(ev.target.value);
  }

  const handleSearch = () => {
    // This function should probably end up calling another function that's passed in as a prop.
    console.log(`Searching for ${searchTerm}`);
  }

  return (
    <div>
      <Input
        fullWidth
        placeholder={placeholder}
        type='search'
        onChange={handleSearchChange}
        onKeyPress={(ev) => {
          if (ev.key === 'Enter')
            handleSearch(ev);
        }}
        endAdornment={
          <InputAdornment position='end'>
            <IconButton onClick={handleSearch}>
              <Search />
            </IconButton>
          </InputAdornment>
        }
      />
    </div>
  );
}

export default SearchBar;