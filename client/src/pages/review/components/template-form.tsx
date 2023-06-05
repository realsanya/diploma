import React, { Dispatch, FC, SetStateAction, useCallback } from 'react';

import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

type TTemplateFormProps = {
  template: any,
  setTemplate: Dispatch<SetStateAction<any>>;
};

const TemplateForm: FC<TTemplateFormProps> = (props) => {
  const { template, setTemplate } = props;

  const handleChangeTitle = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate((prevData: any) => ({
      ...prevData,
      title: (event.target as HTMLInputElement).value
    }));
  }, [setTemplate]);

  const handleChangeRelevance = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate((prevData: any) => ({
      ...prevData,
      relevance: (event.target as HTMLInputElement).value
    }));
  }, [setTemplate]);

  const handleChangeState = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate((prevData: any) => ({
      ...prevData,
      state: (event.target as HTMLInputElement).value
    }));
  }, [setTemplate]);

  const handleChangeNovelty = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate((prevData: any) => ({
      ...prevData,
      novelty: (event.target as HTMLInputElement).value
    }));
  }, [setTemplate]);

  const handleChangeApparatus = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate((prevData: any) => ({
      ...prevData,
      apparatus: (event.target as HTMLInputElement).value
    }));
  }, [setTemplate]);

  const handleChangeStructure = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate((prevData: any) => ({
      ...prevData,
      structure: (event.target as HTMLInputElement).value
    }));
  }, [setTemplate]);

  const handleChangeMethods = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate((prevData: any) => ({
      ...prevData,
      methods: (event.target as HTMLInputElement).value
    }));
  }, [setTemplate]);

  const handleChangeIllustrations = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setTemplate((prevData: any) => ({
      ...prevData,
      illustrations: (event.target as HTMLInputElement).value
    }));
  }, [setTemplate]);

  return (
    <FormControl>
      <FormLabel id="title-group-label" sx={{ marginTop: '15px' }} focused={false}>
        Оценка соответствия названия рукописи ее содержанию
      </FormLabel>
      <RadioGroup
        aria-labelledby="title-group-label"
        name="title-buttons-group"
        value={template.title}
        onChange={handleChangeTitle}
        sx={{ display: 'grid', gap: '2px', marginTop: '5px' }}
      >
        <FormControlLabel sx={{ height: '22px' }} value="good" control={<Radio />} label="хорошо" />
        <FormControlLabel sx={{ height: '22px' }} value="average" control={<Radio />} label="средне" />
        <FormControlLabel sx={{ height: '22px' }} value="bad" control={<Radio />} label="плохо" />
      </RadioGroup>

      <FormLabel id="relevance-group-label" sx={{ marginTop: '15px' }} focused={false}>
        Оценка уровня научной значимости и актуальности тематики рукописи
      </FormLabel>
      <RadioGroup
        aria-labelledby="relevance-group-label"
        name="relevance-buttons-group"
        value={template.relevance}
        onChange={handleChangeRelevance}
        sx={{ display: 'grid', gap: '2px', marginTop: '5px' }}
      >
        <FormControlLabel sx={{ height: '22px' }} value="good" control={<Radio />} label="хорошо" />
        <FormControlLabel sx={{ height: '22px' }} value="average" control={<Radio />} label="средне" />
        <FormControlLabel sx={{ height: '22px' }} value="bad" control={<Radio />} label="плохо" />
      </RadioGroup>

      <FormLabel id="state-group-label" sx={{ marginTop: '15px' }} focused={false}>
        Оценка владения авторами информацией о современном состоянии исследований по тематике рукописи
      </FormLabel>
      <RadioGroup
        aria-labelledby="state-group-label"
        name="state-buttons-group"
        value={template.state}
        onChange={handleChangeState}
        sx={{ display: 'grid', gap: '2px', marginTop: '5px' }}
      >
        <FormControlLabel sx={{ height: '22px' }} value="good" control={<Radio />} label="хорошо" />
        <FormControlLabel sx={{ height: '22px' }} value="average" control={<Radio />} label="средне" />
        <FormControlLabel sx={{ height: '22px' }} value="bad" control={<Radio />} label="плохо" />
      </RadioGroup>

      <FormLabel id="novelty-group-label" sx={{ marginTop: '15px' }} focused={false}>
        Оценка степени научной новизны исследований
      </FormLabel>
      <RadioGroup
        aria-labelledby="novelty-group-label"
        name="novelty-buttons-group"
        value={template.novelty}
        onChange={handleChangeNovelty}
        sx={{ display: 'grid', gap: '2px', marginTop: '5px' }}
      >
        <FormControlLabel sx={{ height: '22px' }} value="good" control={<Radio />} label="хорошо" />
        <FormControlLabel sx={{ height: '22px' }} value="average" control={<Radio />} label="средне" />
        <FormControlLabel sx={{ height: '22px' }} value="bad" control={<Radio />} label="плохо" />
      </RadioGroup>

      <FormLabel id="apparatus-group-label" sx={{ marginTop: '15px' }} focused={false}>
        Оценка состояния научно-справочного аппарата (полнота и ясность аннотации, соответствие ключевых слов теме статьи, библиография)
      </FormLabel>
      <RadioGroup
        aria-labelledby="apparatus-group-label"
        name="apparatus-buttons-group"
        value={template.apparatus}
        onChange={handleChangeApparatus}
        sx={{ display: 'grid', gap: '2px', marginTop: '5px' }}
      >
        <FormControlLabel sx={{ height: '22px' }} value="good" control={<Radio />} label="хорошо" />
        <FormControlLabel sx={{ height: '22px' }} value="average" control={<Radio />} label="средне" />
        <FormControlLabel sx={{ height: '22px' }} value="bad" control={<Radio />} label="плохо" />
      </RadioGroup>

      <FormLabel id="structure-group-label" sx={{ marginTop: '15px' }} focused={false}>
        Оценка структуры, логики и стиля изложения
      </FormLabel>
      <RadioGroup
        aria-labelledby="structure-group-label"
        name="structure-buttons-group"
        value={template.structure}
        onChange={handleChangeStructure}
        sx={{ display: 'grid', gap: '2px', marginTop: '5px' }}
      >
        <FormControlLabel sx={{ height: '22px' }} value="good" control={<Radio />} label="хорошо" />
        <FormControlLabel sx={{ height: '22px' }} value="average" control={<Radio />} label="средне" />
        <FormControlLabel sx={{ height: '22px' }} value="bad" control={<Radio />} label="плохо" />
      </RadioGroup>

      <FormLabel id="methods-group-label" sx={{ marginTop: '15px' }} focused={false}>
        Оценка предлагаемых методов и подходов
      </FormLabel>
      <RadioGroup
        aria-labelledby="methods-group-label"
        name="methods-buttons-group"
        value={template.methods}
        onChange={handleChangeMethods}
        sx={{ display: 'grid', gap: '2px', marginTop: '5px' }}
      >
        <FormControlLabel sx={{ height: '22px' }} value="good" control={<Radio />} label="хорошо" />
        <FormControlLabel sx={{ height: '22px' }} value="average" control={<Radio />} label="средне" />
        <FormControlLabel sx={{ height: '22px' }} value="bad" control={<Radio />} label="плохо" />
      </RadioGroup>

      <FormLabel id="illustrations-group-label" sx={{ marginTop: '15px' }} focused={false}>
        Оценка информативности иллюстративного материала
      </FormLabel>
      <RadioGroup
        aria-labelledby="illustrations-group-label"
        name="illustrations-buttons-group"
        value={template.illustrations}
        onChange={handleChangeIllustrations}
        sx={{ display: 'grid', gap: '2px', marginTop: '5px' }}
      >
        <FormControlLabel sx={{ height: '22px' }} value="good" control={<Radio />} label="хорошо" />
        <FormControlLabel sx={{ height: '22px' }} value="average" control={<Radio />} label="средне" />
        <FormControlLabel sx={{ height: '22px' }} value="bad" control={<Radio />} label="плохо" />
      </RadioGroup>
</FormControl>
  )
};

export default TemplateForm;