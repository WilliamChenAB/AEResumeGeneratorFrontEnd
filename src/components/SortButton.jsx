import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import SortIcon from '@mui/icons-material/Sort';

// Button with image displaying sort state, if sort state is 1 then up arrow, 2 then down, 0 then no sort 

export default function SortButton({ onClick, sortName, sortState }) {
  const icon = sortState === 0 ? <SortIcon /> : sortState === 1 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
  return (
    <Button component='button' variant='outlined' endIcon={icon} onClick={onClick}>Sort By: {sortName}</Button>
  )
}