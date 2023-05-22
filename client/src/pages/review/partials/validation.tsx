import { useCallback, useEffect, useState } from 'react';

import useReviewValidation from '../hooks/useReviewValidation';

import { Box, Typography, useTheme, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SettingField from 'modules/setting-field';

import { DEFAULT_SETTINGS } from '../constants';

const DEFAULT_SETTING = {
  name: '',
  enable: true,
  words: [],
}

const Validation = () => {
  const theme = useTheme();
  const { data, fetchData } = useReviewValidation();

  const [settings, setSettings] = useState<TSetting[]>(DEFAULT_SETTINGS);

  const addSetting = useCallback(() => {
    setSettings((prev) => [...prev, DEFAULT_SETTING]); 
  }, []);

  const deleteSetting = useCallback((index: number) => {
    setSettings((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }, []);

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: 'grid', width: '70%' }}>
      <Typography sx={{ fontWeight: 500 }}>Настройки валидатора:</Typography>
      <Box sx={{ display: 'grid', gap: '20px', width: '80%', marginTop: '20px' }}>
        {settings.map((setting, index) => {
          const changeSetting = (newSetting: TSetting) => {
            setSettings([...settings.slice(0, index), newSetting, ...settings.slice(index + 1)]);
          }

          return (
            <SettingField key={setting.id} idx={index} setting={setting} changeSetting={changeSetting} deleteSetting={deleteSetting} />
          )
        })}
      </Box>

      <Button sx={{ width: '20%', marginTop: '20px' }} onClick={addSetting}>
        <AddIcon sx={{ color: theme.palette.primary.main }} />
        Добавить настройку
      </Button>

      <Box>
        <Button
          sx={{
            m: '2rem 2rem 2rem 0',
            p: '1rem',
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.primary.main,
            borderColor: theme.palette.primary.main,
            border: '1px solid',
            '&:hover': {
              color: theme.palette.primary.main,
            }
          }}
          onClick={() => {}}>
            Сохранить настройки
        </Button>

        <Button
          sx={{
            m: '2rem 0',
            p: '1rem',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.background.alt,
            '&:hover': {
              color: theme.palette.primary.main,
            }
          }}
          onClick={() => {}}>
            Валидировать текст
        </Button>
      </Box>

      <Typography sx={{ fontWeight: 500 }}>Результаты работы валидатора:</Typography>
      <Box sx={{ display: 'grid', marginTop: '20px' }}>
        {data?.map((item) => (
          <Box sx={{ display: 'inline-grid', gridTemplateColumns: '1fr 1fr', marginBottom: '10px' }}>
            <Typography>{item.name}</Typography>
            <Typography>{item.value ? 'Указано' : 'Не указано'}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Validation;