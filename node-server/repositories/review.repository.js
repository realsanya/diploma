import { connect } from '../config/index.js';
import { logger } from '../logger/index.js';

class ReviewRepository {

  db = {};

  constructor() {
    this.db = connect();
  }

  async getAllByUserId(userId) {
    try {
      const reviews = await this.db.review.findAll({ where: { 'userId': userId }, order: [['updatedAt', 'DESC']] });
      return reviews;
    } catch (err) {
      logger.error('Error::' + err);
      return [];
    }
  }

  async getById(reviewId) {
    try {
      const review = await this.db.review.findOne({ where: { 'id': reviewId } });
      return review;
    } catch (err) {
      logger.error('Error::' + err);
      return null;
    }
  }

  async create(review) {
    let data = {};
    try {
      review.createdate = new Date().toISOString();
      data = await this.db.review.create(review);
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;
  }

  async update(review) {
    let data = {};
    try {
      review.updateddate = new Date().toISOString();
      data = await this.db.review.update({...review}, {
        where: {
          id: review.id
        }
      });
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;
  }

  async delete(reviewId) {
    let data = {};
    try {
      data = await this.db.review.destroy({
        where: {
          id: reviewId
        }
      });
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;
  }
}

export default ReviewRepository;