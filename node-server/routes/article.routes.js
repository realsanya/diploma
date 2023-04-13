import express from 'express';

import { articleController, storageController } from '../controllers/index.js';
import { textExtractor } from '../utils/text-extractor.js';
import { keywordsExtractor } from '../utils/keywords-extractor.js';

const FILE_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/msword',
]

const router = express.Router()

router.get('/articles', (req, res) => {
  articleController.getArticles().then(data => res.json(data));
});

router.post('/article', async (req, res) => {
  const type = req.files.file.mimetype;
  if (FILE_TYPES.includes(type)) {
    const storageName = await storageController.uploadFile(req.files.file);
    // text extraction from document (pdf/doc/docx)
    textExtractor(req.files.file).then(async (text) => {
      // create article entry
      //TODO добавить извлечение ключевых слов
      keywordsExtractor(text);
      await articleController.createArticle({ 
        ...req.body,
        storageName,
        text,
      }).then(data => res.json(data));
    }, () => {
      return res.status(500).send({ message: 'Не удалось загрузить файл' });
    });
  } else {
    return res.status(500).send({ message: 'Некорректный формат файла' });
  }
});

export default router