import ReviewService from './review.service.js';
import AuthService from './auth.service.js';
import UserService from './user.service.js';

const reviewService = new ReviewService();
const authService = new AuthService();
const userService = new UserService();

export { 
  reviewService,
  authService, 
  userService,
};