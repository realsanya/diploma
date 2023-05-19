from app import db
from models.Serializer import Serializer
from sqlalchemy.types import ARRAY, TEXT

class Review(db.Model):
  id = db.Column(db.Integer, primary_key =True)
  name = db.Column(db.String(100), nullable = False)
  userId = db.Column(db.Integer, nullable= False)
  articleId = db.Column(db.Integer, nullable = False)
  text = db.Column(db.Text, nullable = False)

  def __repr__(self):
    return "<Review(id='%s', name='%s', storageName='%s', text='%s', keywords='%s')>" % (
      self.id,
      self.name,
      self.userId,
      self.articleId,
      self.text,
   )

  def __init__(self, body):
    self.id = body['id']
    self.name = body['name']
    self.userId = body['userId']
    self.articleId = body['articleId']
    self.text = body['text']
  
  def serialize(self):
    output = Serializer.serialize(self)
    return output
