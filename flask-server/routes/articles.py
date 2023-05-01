from flask import Blueprint, jsonify
from models.Article import Article
from app import db

from utils.keywords_extractor import keywords_extractor
from utils.extractors import urls_extractor

articles = Blueprint('articles', __name__)

@articles.route('/analysis/<articleId>', methods=['GET'])
def analyse(articleId):
  result = {}
  article = Article.query.get_or_404(articleId)
  data = article.serialize()

  if (data):
    # Извлечение ключевых слов
    # keywords = []
    # keywords[0]['key'] = 'keywords'
    # keywords[0]['value'] = keywords_extractor(article.text)
    # result['keywords'] = keywords

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

# @articles.route('/title/<articleId>', methods=['GET'])
# def get_title(articleId):
#   article = Article.query.get_or_404(articleId)
#   data = article.serialize()

#   if (data):
#     title = urls_extractor(article.text)
#     return jsonify(title)
#   return jsonify()

@articles.route('/keywords/<articleId>', methods=['GET'])
def keywords(articleId):
  article = Article.query.get_or_404(articleId)
  data = article.serialize()

  if (data):
    return jsonify(article.keywords)
  
  return jsonify()