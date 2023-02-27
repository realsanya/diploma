import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import API from 'api';
import { Box, useMediaQuery } from '@mui/material';
import Navbar from 'modules/navbar';
import UserWidget from 'modules/user-widget';
import CreateWidget from 'modules/create-widget';
import ReviewWidget from 'modules/review-widget';

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { id } = useSelector((state: any) => state.user);
  const [reviews, setReviews] = useState<Array<TReview>>([]);

  //TODO: вынести в хук
  const getReviews = useCallback(async () => {
    try {
      const response = await fetch(API.REVIEWS, {
        method: 'GET',
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      } else {
        setReviews(result);
  
        return result;
      }
    } catch (error) {
      // setError(error.message || 'Что-то пошло не так');
    }
  }, []);

  useEffect(() => {
    getReviews();
  }, [getReviews]);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? '26%' : undefined}>
          <UserWidget userId={id} />
        </Box>
        {!isNonMobileScreens && <Box flexBasis='26%' padding="2rem 0"><CreateWidget /></Box>}
        <Box
          flexBasis={isNonMobileScreens ? '42%' : '68%'}
          display="flex"
          flexDirection="column"
          gap="1.5rem"
          mt={isNonMobileScreens ? undefined : '2rem'}>
            {reviews.map((review) => (
               <ReviewWidget key={review.id} data={review} />
            ))}
        </Box>
        {isNonMobileScreens && <Box flexBasis='26%'><CreateWidget /></Box>}
      </Box>
    </Box>
  );
};

export default HomePage;