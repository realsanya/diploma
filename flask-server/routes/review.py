from flask import Blueprint, jsonify, request
from models.Setting import Setting
from models.Review import Review
from app import db

from ml.text_validator import text_validator, check_char_count

review = Blueprint('review', __name__)

@review.route('/validation/<reviewId>', methods=['GET'])
def validate(reviewId):
  result = {}

  print(request.args)
  params = request.args

  review = Review.query.get_or_404(reviewId)
  serialized_review = review.serialize()

  settings = Setting.query.filter(Setting.reviewId == reviewId).all()
  
  serialized_settings = []
  for item in settings:
    serialized_settings.append(item.serialize())
  
  result['volume'] = check_char_count(serialized_review['text'], params.get('min'), params.get('max'))
  result['checkers'] = text_validator(serialized_review['text'], serialized_settings)

  return jsonify(result)

  
