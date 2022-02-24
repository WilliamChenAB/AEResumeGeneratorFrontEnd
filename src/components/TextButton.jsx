import Link from '@mui/material/Link';

// TODO: show pop-up on click

export default function TextButton(props) {
  return (
    <Link component="button" variant="body2" underline="none" onClick={props.onClick}>{props.text}</Link>
  )
}