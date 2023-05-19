from flask import Blueprint, jsonify
from models.Review import Review
from app import db

from ml.text_validator import text_validator

review = Blueprint('review', __name__)

@review.route('/validation/<reviewId>', methods=['GET'])
def validate(reviewId):
  result = {}
  review = Review.query.get_or_404(reviewId)
  data = review.serialize()

  if (data):

    result = text_validator(data['text'])

  return jsonify(result)
  
