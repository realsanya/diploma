// @ts-nocheck
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme } from '@mui/material';
import UserImage from 'components/user-image';
import FlexBetween from 'components/flex-between';
import WidgetWrapper from 'components/widget-wrapper';
import API from 'api';

type TUserWidget = {
  userId: number,
};

const UserWidget = ({ userId }: TUserWidget) => {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.token);
  
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;

  //TODO: добавить обработчик ошибок
  const getUser = async () => {
    try {
      const response = await fetch(`${API.USERS}/${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}`}
      });
      const data = await response.json();
  
      if (data.pictureStorageName) {
        const imageResponse = await fetch(`${API.MEDIA}/${data.pictureStorageName}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}`}
        });
    
        const dataImg = await imageResponse.text();
        setImage(dataImg);
      }
      setUser(data);
    } catch (err) {
      //TODO; разлогинить
    }
  };

  useEffect(() => {
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return null;

  const {
    firstName,
    lastName,
  }: TUser = user;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        flexDirection="column"
        onClick={() => navigate(`profile/${userId}`)}
      >
        <FlexBetween width="100%" gap="1rem" flexDirection="row" justifyContent="space-between">
          <FlexBetween>
            <UserImage image={image} />
            <Box display="flex" justifyContent="space-between" flexDirection="column">
              <Typography
                variant='h4'
                color={dark}
                fontWeight="500"
                sx={{
                  '&:hover': {
                    color: palette.primary.light,
                    cursor: 'pointer',
                  }
                }}>
                  {firstName} {lastName}
              </Typography>
              <Typography
                fontSize="10px"
                color={medium}>
                  Здесь должна быть должность
              </Typography>
            </Box>
          </FlexBetween>
          <ManageAccountsOutlined />
        </FlexBetween>

        <Divider style={{ width:'100%' }} />

        <Box pt="1rem" width="100%" display="flex" alignItems="flex-start" flexDirection="column">
          <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
            <LocationOnOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>Здесь должны быть данные</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap="1rem" mb="1rem">
            <WorkOutlineOutlined fontSize="large" sx={{ color: main }} />
            <Typography color={medium}>Здесь должны быть данные</Typography>
          </Box>
        </Box>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default UserWidget;

