import { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';

import API from 'api';
import { setCurrentReview } from 'state';
import StepNavigation from 'components/step-navigation';
import Page from 'components/page';
import { useTheme } from '@mui/material';

const ReviewUpdateForm = () => {
  const theme = useTheme();
  const { reviewId } = useParams();
  const token = useSelector((state: any) => state.token);
  const dispatch = useDispatch();

  const getReview = useCallback(async () => {
    try {
      const response = await fetch(`${API.REVIEW}/${reviewId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}`}
      });

      const review = await response.json()

      if (response.ok) {
        dispatch(
          setCurrentReview({
            currentReview: review,
          })
        );
      }
    } catch (err) {
      console.error(err);
    }
  }, [reviewId, token, dispatch]);

  useEffect(() => {
    getReview();
  }, [getReview]);

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