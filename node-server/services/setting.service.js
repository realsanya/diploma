import { settingRepository } from '../repositories/index.js';

class SettingService {
    
  constructor() {}

  async getSettings(reviewId) {
    return await settingRepository.getAllByReviewId(reviewId);
  }

  async updateSettings(settings, reviewId) {
    await settingRepository.deleteAllByReviewId(reviewId);

    settings.map(async (setting) => {
      // const settingFromDB = await settingRepository.getById(setting.id);
      // if (settingFromDB) {
      //   await settingRepository.update(setting);
      // } else {
      await settingRepository.create(setting);
      // }
    })
  }
  
  async deleteSetting(settingId) {
    return await settingRepository.delete(settingId);
  }
}

export default SettingService;