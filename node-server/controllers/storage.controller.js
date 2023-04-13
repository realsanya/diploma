import { storageService } from '../services/index.js';
import { logger } from '../logger/index.js';

class StorageController {
  async uploadFile(file) {
    logger.info('Controller: uploadFile', file);
    return await storageService.uploadFile(file);
  }

  async downloadFile(fileName) {
    logger.info('Controller: downloadFile', fileName);
    return await storageService.downloadFile(fileName);
  }

  async uploadMedia(media) {
    logger.info('Controller: uploadMedia', media);
    return await storageService.uploadMedia(media);
  }

  async downloadMedia(mediaName) {
    logger.info('Controller: downloadMedia', mediaName);
    return await storageService.downloadMedia(mediaName);
  }
}

export default StorageController;