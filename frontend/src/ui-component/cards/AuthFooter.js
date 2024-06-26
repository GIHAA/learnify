// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://learnifydashboard.io" target="_blank" underline="hover">
      learnifydashboard.io
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://learnify.com" target="_blank" underline="hover">
      &copy; learnify.com
    </Typography>
  </Stack>
);

export default AuthFooter;
