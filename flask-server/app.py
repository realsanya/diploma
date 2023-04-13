import sys
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://realsanya:realsanya@localhost/postgres"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
app.app_context().push()

from models.Article import Article

def format_article(article):
  return {
    "name": article.name
  }

@app.route('/')
def hello():
  return 'Hey!'

@app.route('/article', methods=['POST'])
def create_event():
  print('This is standard output', file=sys.stdout)
  body = request.get_json()
  print(body, file=sys.stdout)
  article = Article(body)
  db.session.add(article)
  db.session.commit()
  return "Success"

if __name__ == '__main__':
  app.run()

