//@ts-nocheck
import { Box } from '@mui/material';
import { VOSviewerOnline } from 'vosviewer-online';
import data from './data.json';

const VOSviewerWidget = () => {
  return (
    <Box sx={{ 
      width: '100%',
      height: '500px',
      border: 'rgb(0, 213, 250) solid 5px',
      marginTop: '20px' 
    }}>
      <VOSviewerOnline data={data} />
    </Box>
  );
};

export default VOSviewerWidget;