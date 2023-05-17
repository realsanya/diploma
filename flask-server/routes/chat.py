from flask import Blueprint, jsonify
from flask import request

from ml.chatsonic import get_answer

chat = Blueprint('chat', __name__)

@chat.route('/predict', methods=['POST'])
def predict():
  data = request.get_json()
  question = data['question']
  if (question):
    answer = get_answer(question)

    response = {
      "question": question,
      "answer": answer,
    }

    return jsonify(response)
  return jsonify()