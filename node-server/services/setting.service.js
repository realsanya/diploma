import { settingRepository } from '../repositories/index.js';
import { storageService } from './index.js';

class SettingService {
    
    constructor() {}

    async getSettings(reviewId) {
        return await settingRepository.getAllByReviewId(reviewId);
    }

    async updateSettings(settings) {
      settings.map(async (setting) => {
        const settingFromDB = await settingRepository.getById(setting.id);
        if (settingFromDB) {
          await settingRepository.update(setting);
        } else {
          await settingRepository.create(setting);
        }
      })
    }
}

export default SettingService;