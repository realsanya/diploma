import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import API from 'api';
import { setCurrentReview } from 'state';

type TData = {
  volume: boolean;
  checkers: Array<{ name: string, value: boolean }>,
}

const useReviewValidation = () => {
  const currentReview = useSelector((state: any) => state.currentReview);
  const dispatch = useDispatch();

  const [data, setData] = useState<TData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchReviewValidation = useCallback(async ({ min, max}: { min: number, max: number }) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API.REVIEW_VALIDATION}/${currentReview?.review?.id}?min=${min}&max=${max}`, {
        method: 'GET',
      });

      if (!response.ok) {
        // throw new Error(result.message);
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
      }
      setIsLoading(false);
    } catch (err) {
      console.error(err); 
    }
  }, [currentReview, dispatch]);


  return {
    data,
    isLoading,
    fetchData: fetchReviewValidation,
  }
};

export default useReviewValidation;
