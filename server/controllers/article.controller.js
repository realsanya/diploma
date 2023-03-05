import { articleService } from '../services/index.js';
import { logger } from '../logger/index.js';

class ArticleController {

  async getArticles() {
    logger.info('Controller: getArticles')
    return await articleService.getArticles();
  }

  async createArticle(article) {
    logger.info('Controller: createArticle', article);
    return await articleService.createArticle(article);
  }

  async updateArticle(article) {
    logger.info('Controller: updateArticle', article);
    return await articleService.updateArticle(article);
  }

  async deleteArticle(articleId) {
    logger.info('Controller: deleteArticle', articleId);
    return await articleService.deleteArticle(articleId);
  }
}

export default ArticleController;