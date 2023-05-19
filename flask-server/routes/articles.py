from flask import Blueprint, jsonify
from models.Article import Article
from app import db

from ml.keywords_extractor import keywords_extractor
from ml.extractors import urls_extractor

articles = Blueprint('articles', __name__)

@articles.route('/analysis/<articleId>', methods=['GET'])
def analyse(articleId):
  result = {}
  article = Article.query.get_or_404(articleId)
  data = article.serialize()

  if (data):
    # Состояние научно-справочного материала
    apparatus = []
    # -- Анализ ссылок на другие источники
    urls = {}
    urls['key'] = 'urls'
    urls['value'] = urls_extractor(article.text)
    apparatus.append(urls)
    result['apparatus'] = apparatus

    # article.keywords = keywords['value']
    article.urls = urls['value']

    db.session.commit()

    return jsonify(result)
  
  return jsonify()

@articles.route('/keywords/<articleId>', methods=['GET'])
def keywords(articleId):
  article = Article.query.get_or_404(articleId)
  data = article.serialize()

  if (data):
    return jsonify(article.keywords)
  
  return jsonify()