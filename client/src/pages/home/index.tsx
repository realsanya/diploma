import { useSelector } from 'react-redux';

import { Box, useMediaQuery } from '@mui/material';
import Navbar from 'modules/navbar';
import UserWidget from 'modules/user-widget';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { id, picturePath } = useSelector((state: any) => state.user)

  // const policy = {
  //   "expiration": "timestamp",
  //   "conditions": [
  //       {"bucket": "diploma-bucket"},
  //       ["starts-with", "$key", "files/"],
  //       {"acl": "public-read"},
  //       {"success_action_redirect": "http://localhost/"},
  //       ["starts-with", "$Content-Type", ""],
  //       ["content-length-range", 0, 1048576]
  //   ]
  // }


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
        <Box
          flexBasis={isNonMobileScreens ? '42%' : undefined}
          mt={isNonMobileScreens ? undefined : '2rem'}>
        </Box>
        {isNonMobileScreens && <Box flexBasis='26%'></Box>}
      </Box>
    </Box>
  );

  // return (
  //   <Box>
  //     <form action="https://storage.yandexcloud.net/diploma-bucket" method="post" encType="multipart/form-data">
  //           Ключ в хранилище:
  //           <input type="input" name="key" value="files" /><br />
  //           <input type="hidden" name="X-Amz-Credential" value="JK38EXAMPLEAKDID8/20190722/ru-central1/s3/aws4_request" />
  //           <input type="hidden" name="acl" value="public-read" />
  //           <input type="hidden" name="X-Amz-Algorithm" value="AWS4-HMAC-SHA256" />
  //           <input type="hidden" name="X-Amz-Date" value="20190722T153936Z" />
  //           <input type="hidden" name="success_action_redirect" value="http://localhost/" />
  //           <input type="hidden" name="policy" value="eyJjb25kaXRpb25zIj...M5OjM2WiJ9" />
  //           <input type="hidden" name="X-Amz-Signature" value="4bdfb2209fc30744458be10bc3b99361f2f50add20f2ca2425587a2722859f96" />
  //           Файл для загрузки:
  //           <input type="file"   name="file" /> <br />
  //           <input type="submit" name="submit" value="Загрузить" />
  //       </form>
  //   </Box>
  // );
};

export default HomePage;