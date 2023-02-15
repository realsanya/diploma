import { connect } from '../config/index.js';
import { logger } from '../logger/index.js';

class ReviewRepository {

    db = {};

    constructor() {
        this.db = connect();
    }

    async getAll() {
        try {
            const reviews = await this.db.reviews.findAll();
            return reviews;
        } catch (err) {
            logger.error('Error::' + err);
            return [];
        }
    }

    async create(review) {
        let data = {};
        try {
            review.createdate = new Date().toISOString();
            data = await this.db.reviews.create(review);
        } catch(err) {
            logger.error('Error::' + err);
        }
        return data;
    }

    async update(review) {
        let data = {};
        try {
            task.updateddate = new Date().toISOString();
            data = await this.db.reviews.update({...review}, {
                where: {
                    id: task.id
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
            data = await this.db.reviews.destroy({
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