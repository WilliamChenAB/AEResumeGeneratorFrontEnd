import { Input, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

/**
 * Search bar component with placeholder text and search button/icon.
 * Takes up full width of parent container.
 * @param placeholder Placeholder text to display in search bar when there is no text
 * @returns SearchBar component
 */
function SearchBar({ placeholder, value, handleChange }) {
  return (
    <div>
      <Input
        fullWidth
        placeholder={placeholder}
        type='search'
        onChange={(event) => handleChange(event.target.value)}
        value={value}
        endAdornment={
          <InputAdornment position='end'>
            <Search />
          </InputAdornment>
        }
      />
    </div>
  );
}

export default SearchBar;