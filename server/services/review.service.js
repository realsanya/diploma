import { articleRepository, reviewRepository } from '../repositories/index.js';
import { storageService } from './index.js';

class ReviewService {
    
    constructor() {}

    async getReviews(userId) {
        return await reviewRepository.getAllByUserId(userId);
    }

    async getReview(reviewId) {
        const review = await reviewRepository.getById(reviewId);
        const article = await articleRepository.getById(review?.articleId);
        const file = await storageService.downloadFile(article?.storageName);
        return {
            review,
            fileName: article?.name,
            file
        };
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