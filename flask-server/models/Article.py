from app import db
from models.Serializer import Serializer

class Article(db.Model):
  id = db.Column(db.Integer, primary_key =True)
  name = db.Column(db.String(100), nullable = False)
  storageName = db.Column(db.String(100), nullable= False)
  # keywords = db.Column(db.Array(db.String(100)), nullable = False)
  text = db.Column(db.Text, nullable = False)

  def __repr__(self):
    return "<Article(name='%s', storageName='%s', text='%s')>" % (
      self.name,
      self.storageName,
      self.text,
   )

  def __init__(self, body):
    self.name = body['name']
    self.storageName = body['storageName']
    self.text = body['text']
  
  def serialize(self):
    output = Serializer.serialize(self)
    return output
