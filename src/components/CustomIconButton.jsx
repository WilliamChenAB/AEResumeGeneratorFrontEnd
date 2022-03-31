import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function CustomIconButton({ children, tooltipText, tooltipPlacement, onClick }) {
  return (
    <>
      {tooltipText ?
        <Tooltip title={tooltipText} placement={tooltipPlacement ? tooltipPlacement : 'bottom'}>
          <IconButton onClick={onClick}>
            {children}
          </IconButton>
        </Tooltip> :
        <IconButton onClick={onClick}>
          {children}
        </IconButton>
      }
    </>

  );
}

export default CustomIconButton;