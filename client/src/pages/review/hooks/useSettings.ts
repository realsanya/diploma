import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import API from 'api';
import { DEFAULT_SETTINGS } from '../constants';

const useSettings = () => {
  const token = useSelector((state: any) => state.token);
  const currentReview = useSelector((state: any) => state.currentReview);

  const [data, setData] = useState<Array<TSetting>>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchSettings = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API.REVIEW_SETTINGS}/${currentReview?.review?.articleId}`, {
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

  const saveSettings = useCallback(async (newSettings: TSetting[]) => {
    try {
      await fetch(`${API.REVIEW_SETTINGS}/${currentReview?.review?.articleId}`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          settings: [...newSettings.map((item) => ({ ...item, reviewId: currentReview.review.id }))]
        })
      });
    } catch (err) {
      console.error(err);
    }
  }, [currentReview, token]);

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    settings: data,
    setSettings: setData, 
    isLoadingSettings: isLoading,
    saveSettings,
  }
};

export default useSettings;