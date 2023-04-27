import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import API from 'api';
import { setCurrentReview } from 'state';

const Analysis = () => {
  const currentReview = useSelector((state: any) => state.currentReview);
  const dispatch = useDispatch();

  const fetchArticleAnalysis = useCallback(async () => {
    try {
      const response = await fetch(`${API.ANALYSE}/${currentReview?.review?.articleId}`, {
        method: 'GET',
      });

      if (!response.ok) {
        // throw new Error(result.message);
      } else {
        const data = await response.json();

        dispatch(
          setCurrentReview({
            currentReview: {
              ...currentReview,
              articleAnalyse: data, 
            }
          })
        );
      }
    } catch (err) {
      console.error(err); 
    }
  }, [currentReview, dispatch]);

  useEffect(() => {
    fetchArticleAnalysis();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      Модуль анализа рукописи
    </div>
  )

  // return (
  //   <Formik
  //     initialValues={{
  //       name: 'New peer review'
  //     }}
  //     onSubmit={() => {}}
  //   >
  //     GeneralInfo
  //   </Formik>
  // )
};

export default Analysis;