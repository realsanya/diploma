from flask import Blueprint, jsonify
from models.Article import Article

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

    return jsonify(result)
  
  return jsonify()