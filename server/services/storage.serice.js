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


class StorageService {
    
  constructor() {}

  async uploadFile(file) {
    const upload = await s3.Upload({ buffer: file.data }, '/files/'); // Загрузка в бакет

    return upload.key.split('/')[1]; // Ответ сервера - ответ от Yandex Object Storage
  }

  async downloadFile(fileName) {
    let download = await s3.Download(`files/${fileName}`);

    const buffer = download.data.Body;

    const b64 = buffer.toString('base64');
      
    return b64;
  }

  async uploadMedia(media) {
    const upload = await s3.Upload({ buffer: media.data }, '/media/'); // Загрузка в бакет
    return upload; // Ответ сервера - ответ от Yandex Object Storage
  }

  async downloadMedia(mediaName) {
    let download = await s3.Download(`media/${fileName}`);

    const buffer = download.data.Body;

    const b64 = buffer.toString('base64');
      
    return b64;
  }

}

export default StorageService;