import express from 'express';
import EY from 'easy-yandex-s3';

const EasyYandexS3 = EY.default;

const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.AWS_SECRET_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
  Bucket: 'diploma-bucket', // Название бакета
  debug: false, // Дебаг в консоли
});

const router = express.Router()

router.post('/media', async (req, res) => {
  let buffer = req.files.file.data; // Буфер загруженного файла
  let upload = await s3.Upload({ buffer }, '/media/'); // Загрузка в бакет
  res.send(upload); // Ответ сервера - ответ от Yandex Object Storage
});

router.post('/file', async (req, res) => {
  let buffer = req.files.file.data; // Буфер загруженного файла
  let upload = await s3.Upload({ buffer }, '/files/'); // Загрузка в бакет
  res.send(upload); // Ответ сервера - ответ от Yandex Object Storage
});

router.get('/media/:name', async (req, res) => {
  const name = req.params.name;
  let download = await s3.Download(`media/${name}`);

  const buffer = download.data.Body;

  const b64 = buffer.toString('base64');
    
  res.send(b64);
});

export default router;