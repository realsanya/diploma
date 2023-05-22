import express from 'express';

import { settingController } from '../controllers/index.js';

const router = express.Router()

router.get('/settings/:reviewId', (req, res) => {
  settingController.getSettings(req.params.userId).then(data => res.json(data));
});

router.put('/settings', (req, res) => {
  settingController.updateSettings(req.body.settings).then(data => res.json(data));
})

export default router