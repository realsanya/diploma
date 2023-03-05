import { Outlet } from 'react-router-dom';
import { useTheme } from '@mui/material';

import Page from 'components/page';
import StepNavigation from 'components/step-navigation';

const ReviewCreateForm = () => {
  const theme = useTheme();

  return (
    <Page>
      <Page.Header>
        <Page.Title style={{ color: theme.palette.neutral.dark }}>Новая рецензия</Page.Title>
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
    </Page>
  )
};

export default ReviewCreateForm;