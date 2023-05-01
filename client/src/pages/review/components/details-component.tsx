import React, { FC } from 'react';
import { SUBTITLE } from 'pages/review/constants';
import { Box, Typography } from '@mui/material';

const DetailsComponent: {
  [name: string]: FC<any>,
} = {
  urls: ({ title, value }: { title: string, value: any }) => {
    return (
      <Box>
        <Typography>{SUBTITLE[title]}:</Typography>
        <Box sx={{ display: 'grid', gap: '5px', marginTop: '10px' }}>
          {value.map((url: string) => (
            <a href={url}>{url}</a>
          ))}
        </Box>
      </Box>
    )
  },
};

export default DetailsComponent;