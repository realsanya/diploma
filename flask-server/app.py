from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://realsanya:realsanya@localhost/postgres"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app, support_credentials=True)
db = SQLAlchemy(app)
app.app_context().push()

from routes.review import review
from routes.articles import articles
from routes.chat import chat

app.register_blueprint(review, url_prefix='/review')
app.register_blueprint(articles, url_prefix='/')
app.register_blueprint(chat, url_prefix='/chat')


# def format_article(article):
#   return {
#     "name": article.name
#   }

# @app.route('/')
# def hello():
#   return 'Hey!'

if __name__ == '__main__':
  app.run()

