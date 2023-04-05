import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, useTheme } from '@mui/material';
import WidgetWrapper from 'components/widget-wrapper';

const CreateWidget = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const createReview = useCallback(() => navigate({ pathname: `/review/create/general-info` }), [navigate]);
  const validateReview = useCallback(() => navigate({ pathname: '/' }), [navigate]); //TODO: add pathname

  return (
    <WidgetWrapper>
      <Button
        fullWidth
        type="submit"
        onClick={createReview}
        sx={{
          m: '2rem 0 1rem 0',
          p: '1rem',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.background.alt,
          '&:hover': {
            color: theme.palette.primary.main,
          }
        }}>
        Создать новую рецензию
      </Button>

      <Button
        fullWidth
        type="submit"
        onClick={validateReview}
        sx={{
          m: '1rem 0 2rem 0',
          p: '1rem',
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.background.alt,
          '&:hover': {
            color: theme.palette.primary.main,
          }
        }}>
        Валидация рецензии
      </Button>
    </WidgetWrapper>
  );
};

export default CreateWidget;