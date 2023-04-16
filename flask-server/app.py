from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://realsanya:realsanya@localhost/postgres"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app, support_credentials=True)
db = SQLAlchemy(app)
app.app_context().push()

from models.Article import Article
from routes.articles import articles

app.register_blueprint(articles, url_prefix='/')

# def format_article(article):
#   return {
#     "name": article.name
#   }

# @app.route('/')
# def hello():
#   return 'Hey!'

# @app.route('/article', methods=['POST'])
# def create_event():
#   body = request.get_json()
#   article = Article(body)
#   db.session.add(article)
#   db.session.commit()
#   return "Success"

if __name__ == '__main__':
  app.run()

