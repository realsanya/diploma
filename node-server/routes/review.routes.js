import express from 'express';

import { reviewController } from '../controllers/index.js';

const router = express.Router()

router.get('/reviews/:userId', (req, res) => {
  reviewController.getReviews(req.params.userId).then(data => res.json(data));
});

router.post('/review', (req, res) => {
  reviewController.createReview(req.body).then(data => res.json(data));
});

router.get('/review/:reviewId', (req, res) => {
  reviewController.getReview(req.params.reviewId).then(data => res.json(data));
})

router.delete('/review/:reviewId', (req, res) => {
  reviewController.deleteReview(req.params.reviewId).then(data => res.json(data));
})

router.put('/review/:reviewId', (req, res) => {
  reviewController.updateReview(req.body).then(data => res.json(data));
})

export default router