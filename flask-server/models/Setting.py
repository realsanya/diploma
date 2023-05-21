from app import db
from models.Serializer import Serializer
from sqlalchemy.types import ARRAY, TEXT

class Setting(db.Model):
  id = db.Column(db.Integer, primary_key =True)
  name = db.Column(db.String(100), nullable = False)
  enable = db.Column(db.Boolean, nullable = False)
  userId = db.Column(db.Integer, nullable= False)
  words = db.Column(ARRAY(TEXT), nullable = True)
  

  def __repr__(self):
    return "<Setting(id='%s', name='%s', userId='%s', enable='%s', words='%s')>" % (
      self.id,
      self.name,
      self.userId,
      self.enable,
      self.words,
   )

  def __init__(self, body):
    self.id = body['id']
    self.name = body['name']
    self.userId = body['userId']
    self.enable = body['enable']
    self.words = body['words']
  
  def serialize(self):
    output = Serializer.serialize(self)
    return output
