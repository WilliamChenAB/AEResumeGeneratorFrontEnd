import { Input, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

/**
 * Search bar component with placeholder text and search button/icon.
 * Takes up full width of parent container.
 * @param placeholder Placeholder text to display in search bar when there is no text
 * @param value Optional text inside search bar.
 * @param onChange onChange handler for search bar.
 * @returns SearchBar component
 */
function SearchBar({ placeholder, value, onChange }) {
  return (
    <div>
      <Input
        fullWidth
        placeholder={placeholder}
        type='search'
        onChange={(event) => onChange(event.target.value)}
        value={value}
        startAdornment={
          <InputAdornment position='start'>
            <Search />
          </InputAdornment>
        }
      />
    </div>
  );
}

export default SearchBar;