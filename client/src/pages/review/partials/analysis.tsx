import { useEffect, FC } from 'react';

import Collapse from 'components/collapse';
import useAnalysisData from 'pages/review/hooks/useAnalysisData';
import DetailsComponent from 'pages/review/components/details-component';

import { Box, CircularProgress } from '@mui/material';


const TITLE: TEnumString = {
  apparatus: 'Состояние научно-справочного аппарата',
};


const Analysis = () => {
  const { data, isLoading, fetchData } = useAnalysisData();

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box sx={{ display: 'grid', width: '70%' }}>
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
          <CircularProgress />
        </Box>
      ) : (
        data && Object.entries(data).map(([key, value]: [string, any], idx) => {
          return (
            <Collapse
              key={key}
              title={TITLE[key]}
              details={
                <>
                  {value.map((item: { key: string, value: any }) => {
                    const DetailsComponentByKey: FC<any> = DetailsComponent[item.key];

                    return (
                      DetailsComponentByKey && <DetailsComponentByKey title={item.key} value={item.value} />
                    )
                  })}
                </>
              }
            />
          )
        })
      )}
    </Box>
  );
};

export default Analysis;