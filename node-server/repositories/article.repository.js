import { connect } from '../config/index.js';
import { logger } from '../logger/index.js';

class ArticleRepository {

  db = {};

  constructor() {
    this.db = connect();
  }

  async getAll() {
    try {
      const articles = await this.db.article.findAll();
      return articles;
    } catch (err) {
      logger.error('Error::' + err);
      return [];
    }
  }

  async getById(articleId) {
    try {
      const article = await this.db.article.findOne({ where: { 'id': articleId } });
      return article;
    } catch (err) {
      logger.error('Error::' + err);
      return null;
    }
  }

  async create(article) {
    let data = {};
    try {
      article.createdate = new Date().toISOString();
      data = await this.db.article.create(article);
    } catch(err) {
      logger.error('Error::' + err);
    }
    return data;
  }

  async update(article) {
    let data = {};
      try {
        article.updateddate = new Date().toISOString();
            data = await this.db.article.update({...article}, {
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
    data = await this.db.article.destroy({
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