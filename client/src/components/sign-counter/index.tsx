import React, { ChangeEvent, FC, useCallback } from 'react';
import { Box, TextField, Typography } from '@mui/material';

type TSignValue = {
  min: number;
  max: number;
};

type TSignCounterProps = {
  value: TSignValue;
  changeValue: (value: TSignValue) => void;
}

const SignCounter: FC<TSignCounterProps> = ({ value, changeValue }) => {

  const handleChangeMinimum = useCallback((ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    changeValue({ min: parseInt(ev.target.value), max: value.max })
  }, [changeValue, value]);

  const handleChangeMaximum= useCallback((ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    changeValue({ max: parseInt(ev.target.value), min: value.min })
  }, [changeValue, value]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography>Количество знаков в тексте рецензии:</Typography>
     
      <Box sx={{ display: 'grid', gridAutoFlow: 'column', gap: '15px', alignItems: 'center' }}>
        <Typography>минимум</Typography>
        <TextField defaultValue={1800} onChange={handleChangeMinimum} sx={{ width: '100px' }} />
        <Typography>максимум</Typography>
        <TextField defaultValue={3600} onChange={handleChangeMaximum} sx={{ width: '100px' }} />
      </Box>
    </Box>
  )
};

export default SignCounter;