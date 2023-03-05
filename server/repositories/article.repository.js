import { connect } from '../config/index.js';
import { logger } from '../logger/index.js';

class ArticleRepository {

  db = {};

  constructor() {
    this.db = connect();
  }

  async getAll() {
    try {
      const articles = await this.db.articles.findAll();
      return articles;
    } catch (err) {
      logger.error('Error::' + err);
      return [];
    }
  }

  async create(article) {
    let data = {};
    try {
      article.createdate = new Date().toISOString();
      data = await this.db.articles.create(article);
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;
  }

  async update(article) {
    let data = {};
      try {
        article.updateddate = new Date().toISOString();
            data = await this.db.articles.update({...article}, {
          where: {
            id: article.id
          }
        });
      } catch(err) {
        logger.error('Error::' + err);
      }
    return data;
  }

  async delete(articleId) {
    let data = {};
    try {
    data = await this.db.articles.destroy({
      where: {
        id: articleId
      }
    });
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;
  }
}

export default ArticleRepository;