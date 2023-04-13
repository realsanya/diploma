import ReviewRepository from './review.repository.js';
import UserRepository from './user.repository.js';
import ArticleRepository from './article.repository.js';

const reviewRepository = new ReviewRepository();
const userRepository = new UserRepository();
const articleRepository = new ArticleRepository();

export {
  reviewRepository,
  userRepository,
  articleRepository,
};