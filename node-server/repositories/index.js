import ReviewRepository from './review.repository.js';
import UserRepository from './user.repository.js';
import ArticleRepository from './article.repository.js';
import SettingRepository from './setting.repository.js';

const reviewRepository = new ReviewRepository();
const userRepository = new UserRepository();
const articleRepository = new ArticleRepository();
const settingRepository = new SettingRepository();

export {
  reviewRepository,
  userRepository,
  articleRepository,
  settingRepository,
};