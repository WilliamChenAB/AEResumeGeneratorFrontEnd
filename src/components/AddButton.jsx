import { Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

/**
 * Add button component with add icon and text
 * @param text Text to display in button
 * @returns AddButton component
 */
function AddButton({ text, onClick }) {
  return (
    <div>
      <Button startIcon={<AddCircleOutline />} onClick={onClick}>
        {text}
      </Button>
    </div>
  );
}

export default AddButton;