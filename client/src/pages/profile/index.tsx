// @ts-nocheck
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import Dropzone from 'react-dropzone';

import Navbar from 'modules/navbar';
import FlexBetween from 'components/flex-between';

import { 
  Box,
  useTheme,
  useMediaQuery,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

import { Formik, FormikProps, FormValues } from 'formik';
import * as yup from 'yup';

const REQUIRED = 'Обязательное поле';

const userSchema = yup.object().shape({
  firstName: yup.string().required(REQUIRED),
  lastName: yup.string().required(REQUIRED),
  email: yup.string().email('Некорректные данные').required(REQUIRED),
  picture: yup.string(),
  position: yup.string(),
  job:  yup.string(),
});


const ProfilePage = () => {
  const currentUser = useSelector((state: any) => state.user);
  const theme = useTheme();
  const isNonMobile = useMediaQuery("(min-width:1000px)");

  const handleFormSubmit = useCallback(async () => {

  }, []);

  console.log(currentUser);

  if (!currentUser) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width={isNonMobile ? '60%' : '93%'}
        p="2rem"
        m="2rem auto"
        sx={{
          borderRadius: "1.5rem",
          backgroundColor: theme.palette.background.alt,
          textAlign: 'center',
        }}
      >
        
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={currentUser}
        validationSchema={userSchema}
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
        }: FormikProps<FormValues>) => {

          const handleUploadFile = async (acceptedFiles) => {
            let formData = new FormData();
            formData.append('file', acceptedFiles[0]);
  
            try {
              const response = await fetch(API.MEDIA, {
                method: 'POST',
                body: formData,
              });
  
              if (!response.ok) {
                throw new Error(result.message);
              } else {
                const data = await response.json();
  
                setFieldValue('picture', acceptedFiles[0]);
                setFieldValue('pictureStorageName', data.key.split('/')[1]);
              }
            } catch (err) {
              setError(error.message || 'Что-то пошло не так');
            }
          };
        
          return (
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
                <Box
                  gridColumn="span 4"
                  border={`1px solid ${theme.palette.neutral.medium}`}
                  borderRadius="5px"
                  p="1rem"
                >
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={handleUploadFile}
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
                            <Typography>{values.pictureStorageName}</Typography>
                            <EditOutlined />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <TextField
                  name="position"
                  label="Должность"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.position}
                  error={!!touched.position && !!errors.position}
                  helperText={touched.position && errors.position}
                  sx={{ gridColumn: 'span 2' }}
                />
                <TextField
                  name="job"
                  label="Место работы"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.job}
                  error={!!touched.job && !!errors.job}
                  helperText={touched.job && errors.job}
                  sx={{ gridColumn: 'span 2' }}
                />
              </Box>
              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    mt: '2rem',
                    p: '1rem',
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.background.alt,
                    '&:hover': {
                      color: theme.palette.primary.main,
                    }
                  }}
                >
                  Сохранить изменения
                </Button>
              </Box>
            </form>
          );
        }}
      </Formik>
      
      </Box>
    </Box>
  );
};

export default ProfilePage;