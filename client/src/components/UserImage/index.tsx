import { Box } from '@mui/material';

type TUserImage = {
  image: string;
  size?: string;
};

const UserImage = ({ image, size = "60px" }: TUserImage) => {
  return (
    <Box>
      <img
        style={{ objectFit: "cover", borderRadius: "50px" }}
        width={size}
        height={size}
        alt="user"
        src={image || 'https://www.tutorialspoint.com/assets/questions/media/426142-1668760872.png'}
      />
    </Box>
  );
};

export default UserImage;