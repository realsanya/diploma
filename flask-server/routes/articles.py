from flask import Blueprint, request, jsonify
from models.Article import Article
from app import db
from utils.keywords_extractor import keywords_extractor

articles = Blueprint('articles', __name__)

@articles.route('/analysis/<articleId>', methods=['GET'])
def analyse(articleId):
  # body = request.get_json()
  article = Article.query.get(articleId)
  db.session.add(article)
  db.session.commit()
  return jsonify('Success!!!')