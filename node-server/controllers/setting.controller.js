import { settingService } from '../services/index.js';
import { logger } from '../logger/index.js';

class SettingController {

  async getSettings(reviewId) {
    logger.info('Controller: getSettings')
    return await settingService.getSettings(reviewId);
  }

  async updateSettings(setting) {
    logger.info('Controller: updateSetting', setting);
    return await settingService.updateSettings(setting);
  }
}

export default SettingController;