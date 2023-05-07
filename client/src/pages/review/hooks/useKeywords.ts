import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import API from 'api';

const useKeywords = () => {
  const currentReview = useSelector((state: any) => state.currentReview);

  const [data, setData] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchKeywords = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API.KEYWORDS}/${currentReview?.review?.articleId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        // throw new Error(result.message);
      } else {
        const data = await response.json();

        setData(data);

        setIsLoading(false);
      }
    } catch (err) {
      console.error(err); 
    }
  }, [currentReview]);

  return {
    data,
    isLoading,
    fetchData: fetchKeywords,
  }
};

export default useKeywords;