import { settingService } from '../services/index.js';
import { logger } from '../logger/index.js';

class SettingController {

  async getSettings(reviewId) {
    logger.info('Controller: getSettings')
    return await settingService.getSettings(reviewId);
  }

  async updateSettings(setting, reviewId) {
    logger.info('Controller: updateSetting', setting);
    return await settingService.updateSettings(setting, reviewId);
  }

  async deleteSetting(settingId) {
    logger.info('Controller: deleteSetting', settingId);
    return await settingService.deleteSetting(settingId);
  }
}

export default SettingController;