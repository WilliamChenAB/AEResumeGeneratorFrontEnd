import { Box, Button, CircularProgress } from '@mui/material';

/**
 * Button with loading icon inside for loading status
 * @param children Children of button
 * @param isLoading Whether or not to display loading spinner on button
 * @param variant MUI button variant
 * @param onClick onClick handler for button
 * @param disabled Whether or not button is disabled
 * @param color MUI button color
 * @returns LoadingButton component
 */
function LoadingButton({ children, isLoading, variant, onClick, disabled = false, color }) {
  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button variant={variant} onClick={onClick} disabled={disabled || isLoading} color={color}>{children}</Button>
      {isLoading &&
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      }
    </Box>
  );
}

export default LoadingButton;