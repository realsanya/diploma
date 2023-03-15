import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import API from 'api';

import { Typography, useTheme, Box, Button } from '@mui/material';
import { EditOutlined, PreviewOutlined, DeleteOutlined } from '@mui/icons-material';
import WidgetWrapper from 'components/widget-wrapper';
import Modal from 'components/modal';

type TReviewWidget = {
  data: TReview;
  refetchReviews: () => void;
};

const ReviewWidget = ({ data, refetchReviews }: TReviewWidget) => {
  const { id, name, createdAt, updatedAt } = data;

  const token = useSelector((state: any) => state.token);
  const theme = useTheme();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const showDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(true);
  }, []);

  const hideDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const deleteReview = useCallback(async () => {
    try {
      const response = await fetch(`${API.REVIEW}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}`}
      });

      if (response.ok) {
        hideDeleteModal();
        refetchReviews();
      }
    } catch (err) {
      //TODO
    }
  }, [id, token, hideDeleteModal, refetchReviews]);

  return (
    <>
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
          <DeleteOutlined sx={{ cursor: 'pointer', color: theme.palette.neutral.dark }} onClick={showDeleteModal} />
        </Box>
      </WidgetWrapper>
      <Modal onClose={hideDeleteModal} isOpen={isDeleteModalOpen}>
        <Box>
          <Typography sx={{ fontSize: '18px' }}>
            Вы уверены, что хотите удалить рецензию ?
          </Typography>

          <Box>
            <Button
              fullWidth
              type="submit"
              onClick={hideDeleteModal}
              sx={{
                m: '2rem 0 1rem 0',
                p: '0.8rem',
                border: `1px solid ${theme.palette.primary.main}`,
                color: theme.palette.primary.main,
                '&:hover': {
                  border: `1px solid ${theme.palette.background.alt}`,
                }
              }}>
              Отмена 
            </Button>
            <Button
              fullWidth
              type="submit"
              onClick={deleteReview}
              sx={{
                m: '1rem 0 2rem 0',
                p: '0.8rem',
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.alt,
                '&:hover': {
                  color: theme.palette.primary.main,
                }
              }}>
              Удалить
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ReviewWidget;