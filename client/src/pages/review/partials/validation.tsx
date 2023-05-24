import { useCallback, useState } from 'react';

import SettingField from 'modules/setting-field';
import SignCounter from 'components/sign-counter';
import useReviewValidation from '../hooks/useReviewValidation';
import useSettings from '../hooks/useSettings';

import { Box, Typography, useTheme, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const DEFAULT_SETTING = {
  name: '',
  enable: true,
  words: [],
}

type TSignValue = {
  min: number;
  max: number;
};

const Validation = () => {
  const theme = useTheme();

  const { data, fetchData } = useReviewValidation();
  const { settings, setSettings, saveSettings } = useSettings();

  const [signValue, setSignValue] = useState<TSignValue>({ min: 1800, max: 3600 });

  const addSetting = useCallback(() => {
    setSettings((prev) => [...prev, DEFAULT_SETTING]); 
  }, [setSettings]);

  const deleteSetting = useCallback((index: number) => {
    setSettings((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }, [setSettings]);

  //TODO: отправлять заданный промежуток кол-ва знаков
  const validateReview = useCallback(() => {
    fetchData();
  }, []);

  const handleSave = useCallback(async () => {
    await saveSettings(settings);
  }, [saveSettings, settings]);

  return (
    <Box sx={{ display: 'grid', width: '70%' }}>
      <Typography sx={{ fontWeight: 500 }}>Настройки валидатора:</Typography>
      <Box sx={{ display: 'grid', gap: '20px', width: '80%', marginTop: '20px' }}>

      <SignCounter value={signValue} changeValue={setSignValue} />

      <Typography sx={{ marginTop: '20px' }}>Настройки проверок наличия требований к рецензии в тексте: </Typography>
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
        Добавить проверку
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
          onClick={handleSave}>
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
          onClick={validateReview}>
            Валидировать текст
        </Button>
      </Box>

      {data && (
        <>
          <Typography sx={{ fontWeight: 500 }}>Результаты работы валидатора:</Typography>
          <Box sx={{ display: 'grid', marginTop: '20px' }}>
            <Typography>Количество знаков в тексте рецензии</Typography>
            <Box sx={{ display: 'grid', marginTop: '10px' }}>
              {data?.checkers.map((item) => (
                <Box sx={{ display: 'inline-grid', gridTemplateColumns: '1fr 1fr', marginBottom: '10px' }}>
                  <Typography>{item.name}</Typography>
                  <Typography>{item.value ? 'Указано' : 'Не указано'}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </>
      )}

    </Box>
  );
};

export default Validation;