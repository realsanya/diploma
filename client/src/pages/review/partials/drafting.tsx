import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import API from 'api';
import TextEditor from 'modules/text-editor';
import { Typography, Button, useTheme, TextField, Box } from '@mui/material';

const Drafting = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const currentReview = useSelector((state: any) => state.currentReview);
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');

  const navigateToValidation = useCallback(() => navigate(`/review/update/${currentReview?.review?.id}/analysis`), [currentReview, navigate]);

  const searchAnswer = useCallback(async () => {
    try {
      const response = await fetch(API.PREDICT, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });

      const result = await response.json();

      console.log(result);

      if (!response.ok) {
        throw new Error(result.message);
      } else {
        const html = result.answer.slice(12, result.answer.length - 18);
        setAnswer(html);
      }
    } catch (err) {
      console.error(err);
    }
  }, [question]);

  const changeQuestion = useCallback((ev: any) => {
    setQuestion(ev.target.value);
  }, []);

  return (
    <>
      <Box>
        <Typography mb="1rem">Используйте редактор для написания текста рецензии: </Typography>
        <TextEditor keywords={currentReview?.articleAnalyse?.keywords} />
      </Box>

      <Box mt="3rem" sx={{ width: '70%' }}>
        <Typography mb="1rem">Используйте поисковой чат-бот для помощи: </Typography>
        <Box mb="2rem" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <TextField value={question} onChange={changeQuestion} sx={{ width: '80%' }} />
          <Button
            sx={{
              p: '1rem',
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.alt,
              '&:hover': {
                color: theme.palette.primary.main,
              }
            }}
            onClick={searchAnswer}>
              Найти ответ
          </Button>
        </Box>
        {answer && <div className="content" dangerouslySetInnerHTML={{__html: answer }}></div>}
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
        onClick={navigateToValidation}>
          Перейти к валидации
      </Button>
    </>
  )
};

export default Drafting;