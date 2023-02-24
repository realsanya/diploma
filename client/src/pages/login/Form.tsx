// @ts-nocheck
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';
import API from 'api';

import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme
} from '@mui/material';
import { EditOutlined } from '@mui/icons-material';
import FlexBetween from 'components/flex-between';

import { Formik, FormikProps, FormValues } from 'formik';
import * as yup from 'yup';
import { setLogin } from 'state';

const REQUIRED = 'Обязательное поле';

const registerSchema = yup.object().shape({
  firstName: yup.string().required(REQUIRED),
  lastName: yup.string().required(REQUIRED),
  email: yup.string().email('Некорректные данные').required(REQUIRED),
  password: yup.string().required(REQUIRED), //TODO: добавить регулярку
  picture: yup.string(),
});

const loginSchema = yup.object().shape({
  email: yup.string().email('Некорректные данные').required(REQUIRED),
  password: yup.string().required(REQUIRED), //TODO: добавить регулярку
});

const initialValuesRegister = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  picture: '',
};

const initialValuesLogin = {
  email: '',
  password: '',
};

const Form = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState<string>('');

  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px");
  const isLogin = mode === 'login';
  const isRegister = mode === 'register';

  useEffect(() => {
    setError('');
  }, [mode]);

  const login = useCallback(async (values, onSubmitProps) => {
    try {
      const response = await fetch(API.LOGIN, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message);
      } else {
        onSubmitProps.resetForm();
        dispatch(
          setLogin({
            user: result.user,
            token: result.token,
          })
        );
        navigate('/home');
      }
    } catch (error) {
      setError(error.message || 'Что-то пошло не так');
    }
  }, [dispatch, navigate]);

  const register = useCallback(async (values, onSubmitProps) => {
    try {
      const response = await fetch(API.REGISTER, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      } else {
        onSubmitProps.resetForm();
        setMode('login');
      }
    } catch (error) {
      setError(error.message || 'Что-то пошло не так');
    }
  }, []);

  const handleFormSubmit = useCallback(async (values, onSubmitProps) => {
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  }, [isLogin, isRegister, login, register]);

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        errors,
        touched,
        values,
        handleSubmit,
        handleBlur,
        handleChange,
        setFieldValue,
        resetForm,
       }: FormikProps<FormValues>) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              '& > div': {
                gridColumn: isNonMobile ? undefined : 'span 4',
              }
            }}
          >
            {isRegister && (
              <>
                <TextField
                  name="firstName"
                  label="Имя"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  name="lastName"
                  label="Фамилия"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.firstName}
                  sx={{ gridColumn: 'span 2' }}
                />
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${theme.palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => 
                      setFieldValue('picture', acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${theme.palette.primary.main}`}
                        p="1rem"
                        sx={{ '&:hover': { cursor: 'pointer' }}}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Добавить фотографию</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
              </>
            )}

            <TextField
              name="email"
              label="Почта"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: 'span 4' }}
              autoComplete='nope'
            />
            <TextField
              name="password"
              type="password"
              inputProps={{
                autoComplete: 'new-password',
                form: {
                  autoComplete: 'off',
                },
              }}
              label="Пароль"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              error={!!touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: 'span 4' }}
            />
            {error && (
              <Typography sx={{ color: 'red', gridColumn: 'span 4', textAlign: 'left' }}>{error}</Typography>
            )}
          </Box>

          {/* BUTTONS */}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.alt,
                '&:hover': {
                  color: theme.palette.primary.main,
                }
              }}
            >
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </Button>
            <Typography
              onClick={() => {
                setMode(isLogin ? 'register' : 'login');
                resetForm();
              }}
              sx={{
                textDecoration: 'underline',
                color: theme.palette.primary.main,
                '&:hover': {
                  cursor: 'pointer',
                  color: theme.palette.primary.light,
                }
              }}
            >
              {isLogin ? 'Нет аккаунта? Зарегистрируйтесь здесь.' : 'Уже есть аккаунт? Авторизируйтесь здесь.'}
            </Typography>
          </Box>

        </form>
      )}
    </Formik>
  );
};

export default Form;




