import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import API from 'api';
import { setCurrentReview } from 'state';

const useReviewGeneration = () => {
  const currentReview = useSelector((state: any) => state.currentReview);
  const dispatch = useDispatch();

  const [data, setData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchReviewGeneration = useCallback(async (values: any) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API.REVIEW_GENERATION}/${currentReview?.review?.id}`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        // throw new Error(result.message);
        return false;
      } else {
        const data = await response.json();

        setData(data);

        dispatch(
          setCurrentReview({
            currentReview: {
              ...currentReview,
              articleAnalyse: data, 
            }
          })
        );

        setIsLoading(false);
        return true;
      }
    } catch (err) {
      console.error(err); 
    }
  }, [currentReview, dispatch]);
  
  return {
    isLoading,
    fetchReviewGeneration,
  }
};

export default useReviewGeneration;