import React, { useState, useCallback, FC, ChangeEvent } from 'react';
import { Checkbox, Box, Input, Typography, IconButton } from '@mui/material';
import TagsInput from 'components/tags-input';
import DeleteIcon from '@mui/icons-material/Delete';

type TSettingFieldProps = {
  idx: number;
  setting: TSetting;
  deleteSetting: (index: number) => void;
  changeSetting: (setting: TSetting) => void;
}

const SettingField: FC<TSettingFieldProps> = (props) => {
  const { idx, setting, deleteSetting, changeSetting } = props;
  const { name, enable, words } = setting;

  const [value, setValue] = useState(name);

  const handleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
    changeSetting({ ...setting, name: ev.target.value });
  }, [changeSetting, setting]);

  const handleChangeEnable = useCallback(() => {
    changeSetting({ ...setting, enable: !enable });
  }, [changeSetting, enable, setting]);

  const handleDeleteSetting = useCallback(() => {
    deleteSetting(idx);
  }, [deleteSetting, idx]);

  const handleChangeWords = useCallback((newWords: string[]) => {
    changeSetting({ ...setting, words: [...newWords] });
  }, [changeSetting, setting]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', flexDirection: 'row', marginBottom: '15px', alignItems: 'center', justifyContent: 'space-between' }}>
        <Input 
          placeholder='Введите название требования'
          value={value}
          onChange={handleChange}
          sx={{ width: '90%' }}
        />
        <Checkbox sx={{ marginLeft: '10px' }} checked={enable} onChange={handleChangeEnable} />
        <IconButton>
          <DeleteIcon onClick={handleDeleteSetting} />
        </IconButton>
      </Box>
      <Typography>Слова для проверки:</Typography>
      <TagsInput tags={words} onChange={handleChangeWords} />
    </Box>
  );
};

export default SettingField;
