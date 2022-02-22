import { FormControl, Select, MenuItem, InputLabel } from '@mui/material';

/**
 * Dropdown component with label text.
 * Takes up full width of parent container.
 * @param label Label text
 * @param required Boolean for whether or not field is required
 * @param options Array of options for the dropdown
 * @returns Dropdown component
 */
function Dropdown({ label, required, options }) {
  const handleChange = (ev) => {
    // This function should probably end up calling another function that's passed in as a prop.
    console.log(`Dropdown option changed to ${ev.target.value}`);
  }

  return (
    <div>
      <FormControl required={required} fullWidth>
        <InputLabel id='select-label'>{label}</InputLabel>
        <Select defaultValue='' labelId='select-label' label={label} onChange={handleChange}>
          {
            options.map(option => {
              return (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              );
            })
          }
        </Select>
      </FormControl>
    </div>
  );
}

export default Dropdown;