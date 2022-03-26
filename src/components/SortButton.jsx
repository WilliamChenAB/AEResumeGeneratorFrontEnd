import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

// Button with image displaying sort state, if sort state is 1 then up arrow, 2 then down, 0 then no sort 

export default function SortButton({onClick, text, sortState}) {
  const icon = sortState === 0? null :  sortState === 1? <ArrowUpwardIcon /> : <ArrowDownwardIcon/>;
  return (
    <Button component="button" variant="contained" endIcon={icon} onClick={onClick}>{text}</Button>
  )
}