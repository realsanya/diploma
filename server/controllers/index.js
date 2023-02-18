import ReviewController from './review.controller.js';
import UserController from './user.controller.js';

const reviewController = new ReviewController();
const userController = new UserController();

export {
  reviewController,
  userController,
};
