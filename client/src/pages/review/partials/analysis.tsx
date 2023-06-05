import { useEffect, useMemo, FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Collapse from 'components/collapse';
import useAnalysisData from 'pages/review/hooks/useAnalysisData';
import DetailsComponent from 'pages/review/components/details-component';
import useKeywords from 'pages/review/hooks/useKeywords';
import VOSviewerWidget from 'modules/vos-viewer';

import { Box, CircularProgress, Typography, Button, useTheme } from '@mui/material';
import TemplateForm from '../components/template-form';
import useReviewGeneration from '../hooks/useReviewGeneration';

const TITLE: TEnumString = {
  apparatus: 'Состояние научно-справочного аппарата',
  trends: 'Акутальность работы'
};


const Analysis = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const currentReview = useSelector((state: any) => state.currentReview);
  const [templateForm, setTemplateForm] = useState({
    title: '',
    relevance: '',
    state: '',
    novelty: '',
    apparatus: '',
    structure: '',
    methods: '',
    illustrations: '',
  });

  const { data, isLoading, fetchData } = useAnalysisData();
  const { data: keywords, isLoading: isKeywordsLoading, fetchData: fetchKeywords } = useKeywords();
  const { fetchReviewGeneration } = useReviewGeneration();

  const navigateToDrafting = useCallback(async () => {
    const isSuccess = await fetchReviewGeneration(templateForm);

    if (isSuccess) {
      navigate(`/review/update/${currentReview?.review?.id}/drafting`)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentReview, templateForm, navigate]);

  useEffect(() => {
    fetchData();
    fetchKeywords();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const DetailsComponentTrends: FC<any> = useMemo(() => DetailsComponent['trends'], []);

  return (
    <>
      <Box sx={{ display: 'grid', width: '70%' }}>
        {isLoading || isKeywordsLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {/* Актуальность работы */}
            <Collapse
              key='trends'
              title={TITLE['trends']}
              details={<DetailsComponentTrends title={'trends'} value={{ words: keywords.slice(0, 5) }} />} />

            {data && Object.entries(data).map(([key, value]: [string, any], idx) => {
              return (
                <Collapse
                  key={key}
                  title={TITLE[key]}
                  details={<>
                    {value.map((item: { key: string; value: any; }) => {
                      const DetailsComponentByKey: FC<any> = DetailsComponent[item.key];

                      return (
                        DetailsComponentByKey && <DetailsComponentByKey title={item.key} value={item.value} />
                      );
                    })}
                  </>} />
              );
            })}

            {/* Интеграция VOSviewer */}
            <Typography sx={{ marginTop: '20px' }}>
              Визуализация сети совпадений терминов, извлеченных из заголовков и рефератов статей в Journal of Informetrics,
              Journal of the Association for Information Science and Technology и Scientometrics:
            </Typography>
            <VOSviewerWidget />

            {/* Форма */}
            <Typography sx={{ marginTop: '40px' }}>
              Форма для генерации шаблона рецензии:
            </Typography>
            <TemplateForm template={templateForm} setTemplate={setTemplateForm} />
          </Box>
        )}
      </Box>
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
        onClick={navigateToDrafting}>
          Перейти к составлению текста
      </Button>
    </>
  );
};

export default Analysis;