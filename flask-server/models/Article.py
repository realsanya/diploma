from app import db
from models.Serializer import Serializer
from sqlalchemy.types import ARRAY, TEXT

class Article(db.Model):
  id = db.Column(db.Integer, primary_key =True)
  name = db.Column(db.String(100), nullable = False)
  storageName = db.Column(db.String(100), nullable= False)
  keywords = db.Column(ARRAY(TEXT), nullable = False)
  text = db.Column(db.Text, nullable = False)

  def __repr__(self):
    return "<Article(name='%s', storageName='%s', text='%s', keywords='%s')>" % (
      self.name,
      self.storageName,
      self.text,
      self.keywords,
   )

  def __init__(self, body):
    self.name = body['name']
    self.storageName = body['storageName']
    self.text = body['text']
    self.keywords = body['keywords']
  
  def serialize(self):
    output = Serializer.serialize(self)
    return output
