import { reviewService } from '../services/index.js';
import { logger } from '../logger/index.js';

class ReviewController {

    async getReviews() {
        logger.info('Controller: getReviews')
        return await reviewService.getReviews();
    }

    async createReview(review) {
        logger.info('Controller: createReview', review);
        return await reviewService.createReview(review);
    }

    async updateReview(review) {
        logger.info('Controller: updateReview', review);
        return await reviewService.updateReview(review);
    }

    async deleteReview(reviewId) {
        logger.info('Controller: deleteReview', reviewId);
        return await reviewService.deleteReview(reviewId);
    }
}

export default ReviewController;