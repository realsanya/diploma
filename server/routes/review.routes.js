import express from 'express';

import { reviewController } from '../controllers/index.js';

const router = express.Router()

router.get('/reviews/:userId', (req, res) => {
  reviewController.getReviews(req.params.userId).then(data => {
    return res.json(data);
  });
});

router.post('/review', (req, res) => {
  reviewController.createReview(req.body).then(data => res.json(data));
});

export default router