import express from 'express';

import { reviewController } from '../controllers/index.js';

const router = express.Router()

router.get('/reviews', (req, res) => {
  reviewController.getReviews().then(data => {
    console.log(data)
    return res.json(data);
  });
});

router.post('/review', (req, res) => {
  console.log(req.body);
  reviewController.createReview(req.body).then(data => res.json(data));
});

export default router