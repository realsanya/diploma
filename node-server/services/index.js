import ReviewService from './review.service.js';
import AuthService from './auth.service.js';
import UserService from './user.service.js';
import ArticleService from './article.service.js';
import StorageService from './storage.serice.js';
import SettingService from './setting.service.js';

const reviewService = new ReviewService();
const authService = new AuthService();
const userService = new UserService();
const articleService = new ArticleService();
const storageService = new StorageService();
const settingService = new SettingService();

export { 
  reviewService,
  authService, 
  userService,
  articleService,
  storageService,
  settingService,
};