import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import API from 'api';
import { setCurrentReview } from 'state';

const useAnalysisData = () => {
  const currentReview = useSelector((state: any) => state.currentReview);
  const dispatch = useDispatch();

  const [data, setData] = useState<Array<{ key: string, value: any }> | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchArticleAnalysis = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API.ANALYSE}/${currentReview?.review?.articleId}`, {
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
    fetchData: fetchArticleAnalysis,
  }
};

export default useAnalysisData;