import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMode, setLogout } from 'state';

import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from '@mui/icons-material';
import FlexBetween from 'components/FlexBetween';

import { MIN_SCREEN_WIDTH } from 'modules/constants';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user: TUser | null = useSelector((state: TState) => state.user);
  const isNonMobileScreens = useMediaQuery(MIN_SCREEN_WIDTH);
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = useMemo(() => `${user?.firstName || 'false'} ${user?.lastName || 'person'}`, [user]);

  return (
    <FlexBetween
      sx={[{
        padding: '1rem 6%',
        backgroundColor: alt,
      }]}
      >
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate('/home')}
          sx={{
            '&:hover': {
              color: primaryLight,
              cursor: 'pointer',
            }
          }}
        >
          PeerReviews
        </Typography>
      </FlexBetween>

      {/* DEKSTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton
            onClick={() => dispatch(setMode())}>
              {theme.palette.mode === 'dark' ? (
                <DarkMode sx={{ fontSize: '25px' }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: '25px' }} />
              )}
          </IconButton>
          <Notifications sx={{ fontSize: '25px' }} />
          <Help sx={{ fontSize: '25px' }} />
          <FormControl variant='standard'>
            <Select 
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: '250px',
                borderRadius: '0.25rem',
                p: '0.25rem 1rem',
                '& .MuiSvgIcon-root': {
                  pr: '0.25rem',
                  width: '3rem',
                },
                '& .MuiSelect-select:focus': {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>
                Выйти
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}


      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          sx={{
            position: 'fixed',
            right: 0,
            bottom: 0,
            height: '100%',
            zIndex: 10,
            maxWidth: '500px',
            minWidth: '300px',
            backgroundColor: background,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: '1rem' }}>
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>

            {/* MENU ITEMS */}
            <FlexBetween sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
            }}>
              <IconButton
                sx={{ fontSize: '25px' }}
                onClick={() => dispatch(setMode())}>
                  {theme.palette.mode === 'dark' ? (
                    <DarkMode sx={{ fontSize: '25px' }} />
                  ) : (
                    <LightMode sx={{ color: dark, fontSize: '25px' }} />
                  )}
              </IconButton>
              <Notifications sx={{ fontSize: '25px' }} />
              <Help sx={{ fontSize: '25px' }} />
              <FormControl variant='standard'>
                <Select 
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: '150px',
                    borderRadius: '0.25rem',
                    p: '0.25rem 1rem',
                    '& .MuiSvgIcon-root': {
                      pr: '0.25rem',
                      width: '3rem',
                    },
                    '& .MuiSelect-select:focus': {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Выйти
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;