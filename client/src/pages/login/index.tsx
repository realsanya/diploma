import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import Form from './Form';

import { MIN_SCREEN_WIDTH } from 'pages/constants';

const LoginPage = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery(MIN_SCREEN_WIDTH);
  return (
    <Box> 
      <Box 
        width="100%"
        p="1rem 6%"
        sx={{
          backgroundColor: theme.palette.background.alt,
          textAlign: 'center',
        }}
      >
          <Typography
            fontWeight="bold"
            fontSize="32px"
            color="primary"
          >
            PeerReviews
          </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? '50%' : '93%'}
        p="2rem"
        m="2rem auto"
        sx={{
          borderRadius: "1.5rem",
          backgroundColor: theme.palette.background.alt,
          textAlign: 'center',
        }}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "0.5rem" }}>
          Добро пожаловать в PeerReviews!
        </Typography>
        <Typography fontWeight="400" variant="h6" sx={{ mb: "1.5rem" }}>
          PeerReviews - это система поддержки составления рецензий на научные публикации. 
        </Typography>
        <Form />
      </Box>
    </Box>
  );
};

export default LoginPage;