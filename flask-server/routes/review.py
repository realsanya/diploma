from flask import Blueprint, jsonify
from models.Setting import Setting
from models.Review import Review
from app import db

from ml.text_validator import text_validator

review = Blueprint('review', __name__)

@review.route('/validation/<reviewId>', methods=['GET'])
def validate(reviewId):
  result = {}

  review = Review.query.get_or_404(reviewId)
  serialized_review = review.serialize()

  settings = Setting.query.filter(Setting.reviewId == reviewId).all()
  
  serialized_settings = []
  for item in settings:
    serialized_settings.append(item.serialize())
  
  result['checkers'] = text_validator(serialized_review['text'], serialized_settings)

  return jsonify(result)

  
