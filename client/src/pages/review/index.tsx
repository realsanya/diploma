import { Outlet } from 'react-router-dom';

import { Box } from '@mui/material';
import Navbar from 'modules/navbar';

const ReviewModuleOutlet = () => (
  <Box>
     <Navbar />
     <Outlet />
  </Box>
)
;

export default ReviewModuleOutlet;