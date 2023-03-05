import { articleRepository } from '../repositories/index.js';

class ArticleService {
    
  constructor() {}

  async createArticle(article) {
    return await articleRepository.create(article);
  }

  async updateArticle(article) {
    return await articleRepository.update(article);
  }

  async deleteArticle(articleId) {
    return await articleRepository.delete(articleId);
  }

}

export default ArticleService;