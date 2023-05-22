import express from 'express';

import { settingController } from '../controllers/index.js';

const router = express.Router()

router.get('/settings/:reviewId', (req, res) => {
  settingController.getSettings(req.params.reviewId).then(data => res.json(data));
});

router.put('/settings/:reviewId', (req, res) => {
  settingController.updateSettings(req.body.settings, req.params.reviewId).then(data => res.json(data));
});

router.delete('/settings', (req, res) => {
  settingController.deleteSetting(req.body.settingId).then(data => res.json(data));
});

export default router