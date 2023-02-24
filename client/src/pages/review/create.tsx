import { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Button, useTheme } from '@mui/material';
import Page from 'components/page';
import StepNavigation from 'components/step-navigation';
import Toolbar from 'components/toolbar';

const ReviewCreateForm = () => {

  const theme = useTheme();
  // const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    // console.log(data);
    // navigate(`/review/update/${id}/analysis`);
  }, []);

  return (
    <Page>
      <Page.Header>
        <Page.Title style={{ color: theme.palette.neutral.dark }}>ReviewCreateForm</Page.Title>
        <StepNavigation 
          links={[
            { title: 'Общее', href: 'general-info', disabled: false },
            { title: 'Анализ рукописи', href: '', disabled: true },
            { title: 'Составление текста', href: '', disabled: true },
            { title: 'Валидация', href: '', disabled: true },
          ]}
          state={{}}
        />
      </Page.Header>

      <Page.Body>
        <Outlet />
      </Page.Body>

      <Page.Footer>
        <Toolbar>
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
        </Toolbar>
      </Page.Footer>
    </Page>
  )
};

export default ReviewCreateForm;