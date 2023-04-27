from flask import Blueprint, jsonify
from models.Article import Article
from app import db

from utils.keywords_extractor import keywords_extractor

articles = Blueprint('articles', __name__)

@articles.route('/analysis/<articleId>', methods=['GET'])
def analyse(articleId):
  result = {}
  article = Article.query.get_or_404(articleId)
  data = article.serialize()

  if (data):
    keywords = keywords_extractor(article.text)
    result['keywords'] = keywords

    article.keywords = keywords
    db.session.commit()

    return jsonify(result)
  
  return jsonify()


@articles.route('/keywords/<articleId>', methods=['GET'])
def keywords(articleId):
  article = Article.query.get_or_404(articleId)
  print(article)
  data = article.serialize()

  if (data):
    return jsonify(article.keywords)
  
  return jsonify()