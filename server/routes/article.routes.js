import express from 'express';

import { articleController, storageController } from '../controllers/index.js';

const router = express.Router()

router.get('/articles', (req, res) => {
  articleController.getArticles().then(data => res.json(data));
});

router.post('/article', async (req, res) => {
  const storageName = await storageController.uploadFile(req.files.file);
  await articleController.createArticle({ 
    ...req.body,
    storageName,
  }).then(data => res.json(data));
});

export default router