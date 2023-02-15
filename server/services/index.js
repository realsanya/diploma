import ReviewService from './review.service.js';
import AuthService from './auth.service.js';

const reviewService = new ReviewService();
const authService = new AuthService();

export { 
  reviewService,
  authService
};