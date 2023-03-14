//@ts-nocheck
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { Formik } from 'formik';

import API from 'api';
import { Box, useTheme, Typography, Button, TextField } from '@mui/material';
import { EditOutlined } from '@mui/icons-material';

import FlexBetween from 'components/flex-between';


const GeneralInfo = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id: userId } = useSelector((state: any) => state.user);

  const handleFormSubmit = useCallback(async (data: TReview) => {
    try {
      const { file, ...rest } = data;

      const response = await fetch(API.REVIEW, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rest),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      } else {
        const { id } = result;

        if (id) navigate(`/review/update/${id}/analysis`);
        console.log(result);
      }
    } catch (error) {
      // setError(error.message || 'Что-то пошло не так');
    }
  }, [navigate]);

  return (
    <Formik
        onSubmit={handleFormSubmit}
        initialValues={{ file: null, name: 'Новая рецензия', userId }}
    > 
      {({
        handleSubmit,
        setFieldValue,
        handleBlur,
        handleChange,
        values,
        touched,
        errors,
      }) => {

        const handleUploadFile = async (acceptedFiles) => {
          let formData = new FormData();
          formData.append('file', acceptedFiles[0]);
          formData.append('name', acceptedFiles[0].name);
          
          try {
            const response = await fetch(API.ARTICLE, {
              method: 'POST',
              body: formData,
            });

            if (!response.ok) {
              throw new Error(result.message);
            } else {
              const data = await response.json();
          
              setFieldValue('articleId', data?.id);
              setFieldValue('file', acceptedFiles[0]);
            }
          } catch (err) {
            //TODO 
          }
        };


        //TODO: добавить поля для создания рецензии
        return (
          <form>
            <Box
              sx={{
                display: 'grid',
                gap: '30px',
                gridAutoFlow: 'row',
                width: '70%',
              }}
            >
              <TextField
                name="name"
                label="Название рецензии"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
              />
              <Box
                border={`1px solid ${theme.palette.neutral.medium}`}
                borderRadius="5px"
                p="1rem"
              >
                <Dropzone
                  acceptedFiles=".docx, .pdf"
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
                      {!values.file ? (
                        <p>Добавить статью (.pdf, .docx)</p>
                      ) : (
                        <FlexBetween>
                          <Typography>{values.file.name}</Typography>
                          <EditOutlined />
                        </FlexBetween>
                      )}
                    </Box>
                  )}
                </Dropzone>
              </Box>
            </Box>
            <Button
              sx={{
                m: '2rem 0',
                p: '1rem',
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.alt,
                '&:hover': {
                  color: theme.palette.primary.main,
                }
              }}
              onClick={handleSubmit}>
              Сохранить и перейти к анализу
            </Button>
          </form>
        )
      }}
    </Formik>
  );
};

export default GeneralInfo;