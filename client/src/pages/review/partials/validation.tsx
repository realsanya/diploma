import { useEffect } from 'react';

import useReviewValidation from '../hooks/useReviewValidation';

import { Box, Typography } from '@mui/material';

const Validation = () => {

  const { data, fetchData } = useReviewValidation();

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: 'grid', width: '70%' }}>
      {data?.map((item) => (
        <Box sx={{ display: 'inline-grid', gridTemplateColumns: '1fr 1fr', marginBottom: '10px' }}>
          <Typography>{item.name}</Typography>
          <Typography>{item.value ? 'Указано' : 'Не указано'}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Validation;