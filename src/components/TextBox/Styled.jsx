import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import { colorToken  } from '../../theme/colorToken';

const StyledTextField = styled(TextField)`
  background: ${props => props.selected? colorToken.brand.aeGreenLight : colorToken.greyPalette.lightGrey };
  & .MuiOutlinedInput-root {
    &:hover fieldset {
      border-color: green;
    }
  }

`;

export default StyledTextField;