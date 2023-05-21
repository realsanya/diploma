import { useCallback, useState, ChangeEvent, FC } from 'react';
import { Box, Chip, Input } from '@mui/material';

type TTagsInputProps = {
  tags: string[];
}

const TagsInput: FC<TTagsInputProps> = (props) => {
  const { tags } = props;

  const [value, setValue] = useState<string | null>(null);
  const [currentTags, setCurrentTags] = useState<string[]>(tags);

  const handleDelete = useCallback((prop: string) => {
    console.log(prop);
  }, []);

  const keyPress = useCallback((ev: KeyboardEvent) => {
    if (ev.keyCode === 13 && value) {
      setCurrentTags((prev) => [...prev, value]);
      setValue('');
    }
  }, [value]);

  const handleChange = useCallback((ev: ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Input
        value={value}
        placeholder='Введите слово'
        // @ts-ignore
        onKeyDown={keyPress}
        onChange={handleChange}
      />

      <Box sx={{ margin: '10px 0', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
        {currentTags.map((currentTag, idx) => (
          <Chip
            sx={{ wordBreak: 'break-all'}}
            key={`tag-${currentTag}-${idx}`}
            label={currentTag}
            onDelete={handleDelete}
          />
        ))}
      </Box>
    </Box>
  )
};

export default TagsInput;