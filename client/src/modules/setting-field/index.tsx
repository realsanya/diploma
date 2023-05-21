import React, { useState, useCallback, FC, ChangeEvent } from 'react';
import { Checkbox, Box, Input, Typography } from '@mui/material';
import TagsInput from 'components/tags-input';

type TSetting = {
  name: string;
  enable: boolean;
  words: string[];
}

type TSettingFieldProps = {
  name: string;
  enable: boolean;
  words: string[];
  changeSetting: (setting: TSetting) => void;
}

const SettingField: FC<TSettingFieldProps> = (props) => {
  const { name, enable, words, changeSetting } = props;

  const [value, setValue] = useState(name);

  const handleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  }, []);

  const handleChangeEnable = () => {
    changeSetting({ name, words, enable: !enable });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '15px' }}>
        <Checkbox checked={enable} onChange={handleChangeEnable} />
        <Input 
          placeholder='Введите название настройки'
          value={value}
          onChange={handleChange}
          sx={{ width: '100%' }}
        />
      </Box>
      <Typography>Слова для проверки:</Typography>
      <TagsInput tags={words} />
    </Box>
  );
};

export default SettingField;
