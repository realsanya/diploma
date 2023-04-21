import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TextEditor from 'modules/text-editor';
import { Typography, Button, useTheme } from '@mui/material';

const Drafting = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const currentReview = useSelector((state: any) => state.currentReview);

  const navigateToValidation = useCallback(() => navigate(`/review/update/${currentReview?.review?.id}/analysis`), [currentReview, navigate]);

  return (
    <>
      <Typography mb="1rem">Используйте редактор для написания текста рецензии: </Typography>
      <TextEditor keywords={currentReview?.articleAnalyse?.keywords} />

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
        onClick={navigateToValidation}>
          Перейти к валидации
      </Button>
    </>
  )
};

export default Drafting;