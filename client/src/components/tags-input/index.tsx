import { useCallback, useState, ChangeEvent, FC } from 'react';
import { Box, Chip, Input } from '@mui/material';

type TTagsInputProps = {
  tags: string[];
  onChange: (words: string[]) => void;
}

const TagsInput: FC<TTagsInputProps> = (props) => {
  const { tags, onChange } = props;

  const [value, setValue] = useState<string | null>(null);

  const handleDelete = useCallback((index: number) => {
    onChange([...tags.slice(0, index), ...tags.slice(index + 1)]);
  }, [onChange, tags]);

  const keyPress = useCallback((ev: KeyboardEvent) => {
    if (ev.keyCode === 13 && value) {
      setValue('');
      onChange([...tags, value]);
    }
  }, [onChange, tags, value]);

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
        {tags.map((currentTag, idx) => (
          <Chip
            sx={{ wordBreak: 'break-all'}}
            key={`tag-${currentTag}-${idx}`}
            label={currentTag}
            onDelete={() => handleDelete(idx)}
          />
        ))}
      </Box>
    </Box>
  )
};

export default TagsInput;