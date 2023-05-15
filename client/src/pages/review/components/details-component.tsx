import React, { FC } from 'react';
import { SUBTITLE } from 'pages/review/constants';
import GoogleTrends from 'modules/google-trends';
import { Box, Typography } from '@mui/material';

const DetailsComponent: {
  [name: string]: FC<any>,
} = {
  urls: ({ title, value }: { title: string, value: any }) => {
    return (
      <Box>
        <Typography>{SUBTITLE[title]}:</Typography>
        <Box sx={{ display: 'grid', gap: '5px', marginTop: '10px' }}>
          {value.map((url: string, idx: number) => (
            <a key={idx} href={url} target="_blank" rel="noreferrer">{url}</a>
          ))}
        </Box>
      </Box>
    )
  },

  trends: ({ title, value }: { title: string, value: { words?: string[] } }) => {
    const keywords = value.words || [];
    const geo = "RU";
    const time = "today 12-m";
    const property = "";
    const comparison = keywords.map((q) => ({ keyword: q, geo: geo, time: time }));
    const keyword = keywords.join();
    
    return (
      <Box>
        <Typography>{SUBTITLE[title]}:</Typography>
        <Box id="widget" sx={{ display: 'grid', gap: '5px', marginTop: '10px' }}>
          <GoogleTrends
            type="TIMESERIES"
            comparison={comparison}
            keyword={keyword}
            time={time}
            property={property}
          />
          {keywords.map((word, idx) => (
            <GoogleTrends
              key={`${word}-${idx}-q`}
              type={keywords.length > 1 ? `RELATED_QUERIES_${idx}` : 'RELATED_QUERIES'}
              comparison={comparison}
              keyword={word}
              time={time}
              property={property}
            />
          ))}
          {/* {keywords.length === 1 ? keywords.map((word, idx) => (
            <GoogleTrends
              key={`${word}-${idx}-t`}
              type={`RELATED_TOPICS`}
              comparison={comparison}
              keyword={word}
              time={time}
              property={property}
            />
          )): ''} */}
        </Box>
      </Box>
    )
  }
};

export default DetailsComponent;