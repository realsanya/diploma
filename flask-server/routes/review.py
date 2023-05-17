from flask import Blueprint, jsonify
from models.Article import Article
from app import db

from ml.sentiment_analyse import sentiment_analyse

review = Blueprint('review', __name__)

@review.route('/analyse/<reviewId>', methods=['GET'])
def analyse(reviewId):
  result = {}
  # article = Article.query.get_or_404(reviewId)
  # data = article.serialize()

  result['sentiment'] = sentiment_analyse('Маленькая девочка потерялась в торговом центре')

  return jsonify(result)
  
