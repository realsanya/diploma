from app import db

class Article(db.Model):
  id = db.Column(db.Integer, primary_key =True)
  name = db.Column(db.String(100), nullable = False)
  storageName = db.Column(db.String(100), nullable= False)
  # keywords = db.Column(db.Array(db.String(100)), nullable = False)
  text = db.Column(db.Text, nullable = False)

  def __init__(self, body):
    self.name = body['name']
    self.storageName = body['storageName']
    self.text = body['text']