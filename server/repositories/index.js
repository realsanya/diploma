import ReviewRepository from './review.repository.js';
import UserRepository from './user.repository.js';

const reviewRepository = new ReviewRepository();
const userRepository = new UserRepository();

export {
  reviewRepository,
  userRepository,
};