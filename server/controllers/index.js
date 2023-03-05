import ReviewController from './review.controller.js';
import UserController from './user.controller.js';
import ArticleController from './article.controller.js';
import StorageController from './storage.controller.js';

const reviewController = new ReviewController();
const userController = new UserController();
const articleController = new ArticleController();
const storageController = new StorageController();

export {
  reviewController,
  userController,
  articleController,
  storageController,
};
