import { useSelector } from 'react-redux';
import { Box, useMediaQuery } from '@mui/material';
import Navbar from 'modules/navbar';
import UserWidget from 'modules/user-widget';
import CreateWidget from 'modules/create-widget';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { id, picturePath } = useSelector((state: any) => state.user)


  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={id} picturePath={picturePath} />
        </Box>
        {!isNonMobileScreens && <Box flexBasis='26%' padding="2rem 0"><CreateWidget /></Box>}
        <Box
          flexBasis={isNonMobileScreens ? '42%' : '68%'}
          mt={isNonMobileScreens ? undefined : '2rem'}>
            fffff
        </Box>
        {isNonMobileScreens && <Box flexBasis='26%'><CreateWidget /></Box>}
      </Box>
    </Box>
  );
};

export default HomePage;