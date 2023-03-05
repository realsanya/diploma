import { Outlet } from "react-router-dom";
import StepNavigation from 'components/step-navigation';

import { useTheme } from '@mui/material';
import Page from 'components/page';

const ReviewUpdateForm = () => {
  const theme = useTheme();

  return (
    <Page>
      <Page.Header>
        <Page.Title style={{ color: theme.palette.neutral.dark }}>ReviewCreateForm</Page.Title>
        <StepNavigation 
          links={[
            { title: 'Общее', href: 'general-info', disabled: false },
            { title: 'Анализ рукописи', href: 'analysis', disabled: false },
            { title: 'Составление текста', href: 'drafting', disabled: false },
            { title: 'Валидация', href: 'validation', disabled: false },
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

export default ReviewUpdateForm;