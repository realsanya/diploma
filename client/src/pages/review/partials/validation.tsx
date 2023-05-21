import { useCallback, useEffect } from 'react';

import useReviewValidation from '../hooks/useReviewValidation';

import { Box, Typography } from '@mui/material';
import SettingField from 'modules/setting-field';

type TSetting = {
  name: string;
  enable: boolean;
  words: string[];
}

const Validation = () => {

  const { data, fetchData } = useReviewValidation();

  const changeSetting = useCallback((newSetting: TSetting) => {
    console.log(newSetting);
  }, []);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: 'grid', width: '70%' }}>
      <Typography sx={{ fontWeight: 500 }}>Настройки валидатора:</Typography>
      <Box sx={{ display: 'grid', width: '70%' }}>
        <SettingField name='Состояние научно-справочного аппарата' enable words={['соответствует', 'не соответствует']} changeSetting={changeSetting}/>
      </Box>

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