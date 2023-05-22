import { connect } from '../config/index.js';
import { logger } from '../logger/index.js';

class SettingRepository {

  db = {};

  constructor() {
    this.db = connect();
  }

  async getAllByReviewId(reviewId) {
    try {
      const settings = await this.db.setting.findAll({ where: { 'reviewId': reviewId }, order: [['updatedAt', 'DESC']] });
      return settings;
    } catch (err) {
      logger.error('Error::' + err);
      return [];
    }
  }

  async getById(settingId) {
    try {
      const setting = await this.db.setting.findOne({ where: { 'id': settingId } });
      return setting;
    } catch (err) {
      logger.error('Error::' + err);
      return null;
    }
  }


  async create(setting) {
    let data = {};
    try {
      setting.createdate = new Date().toISOString();
      data = await this.db.setting.create(setting);
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;
  }

  async update(setting) {
    let data = {};
    try {
      setting.updateddate = new Date().toISOString();
      data = await this.db.setting.update({...setting}, {
        where: {
          id: setting.id
        }
      });
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;
  }

  async delete(settingId) {
    let data = {};
    try {
      data = await this.db.setting.destroy({
        where: {
          id: settingId
        }
      });
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;
  }

  async deleteAllByReviewId(reviewId) {
    let data = {};
    try {
      data = await this.db.setting.destroy({
        where: {
          reviewId
        }
      });
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;
  }
}

export default SettingRepository;