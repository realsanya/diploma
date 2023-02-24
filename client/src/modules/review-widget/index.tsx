import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

import { Typography, useTheme, Box } from '@mui/material';
import { EditOutlined, PreviewOutlined, DeleteOutlined } from '@mui/icons-material';
import WidgetWrapper from 'components/widget-wrapper';

type TReviewWidget = {
  data: TReview
}

const ReviewWidget = ({ data }: TReviewWidget) => {
  const { id, name, createdAt, updatedAt } = data;
  const theme = useTheme();

  const handleDeleteClick = useCallback(() => {
    //TODO: delete
  }, []);

  return (
    <WidgetWrapper>
      <Typography>{name}</Typography>
      <Box p="1rem 0">
        <Typography sx={{ color: theme.palette.neutral.medium }}>Дата создания: {moment(new Date(createdAt)).format('LLL')}</Typography>
        <Typography sx={{ color: theme.palette.neutral.medium }}>Дата обновления: {moment(new Date(updatedAt)).format('LLL')}</Typography>
      </Box>
      <Box display="flex" flexDirection="row" gap="0.5rem">
        <Link to={`/review/view/${id}`}>
          <PreviewOutlined sx={{ cursor: 'pointer', color: theme.palette.neutral.dark }} />
        </Link>
        <Link to={`/review/update/${id}/general-info`}>
          <EditOutlined sx={{ cursor: 'pointer', color: theme.palette.neutral.dark }} />
        </Link>
        <DeleteOutlined sx={{ cursor: 'pointer', color: theme.palette.neutral.dark }} onClick={handleDeleteClick} />
      </Box>
    </WidgetWrapper>
  );
};

export default ReviewWidget;