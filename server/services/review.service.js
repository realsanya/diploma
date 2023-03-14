import { reviewRepository } from '../repositories/index.js';

class ReviewService {
    
    constructor() {}

    async getReviews(userId) {
        return await reviewRepository.getAllByUserId(userId);
    }

    async createReview(review) {
        return await reviewRepository.create(review);
    }

    async updateReview(review) {
        return await reviewRepository.update(review);
    }

    async deleteReview(reviewId) {
        return await reviewRepository.delete(reviewId);
    }

}

export default ReviewService;