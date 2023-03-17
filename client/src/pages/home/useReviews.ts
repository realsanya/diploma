import { useState, useCallback, useEffect } from 'react';
import API from 'api';

type TUseReviewsProps = {
  id: number;
};

const useReviews= ({ id }: TUseReviewsProps) => {
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

    const getReviews = useCallback(async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API.REVIEWS}/${id}`, {
          method: 'GET',
          headers: { "Content-Type": "application/json" },
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.message);
        } else {
          setReviews(result);
        }
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    }, [id]);

    useEffect(() => {
      getReviews();
    }, []);

    return { reviews, isLoading, getReviews };
};

export default useReviews;