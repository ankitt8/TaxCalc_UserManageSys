# from app import db 
# import __init__
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), primary_key=True)
    phone = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(70), nullable=False)
    city = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(1000), nullable=False)
    role = db.Column(db.String(10), nullable=False)


    def __repr__(self):
        return '{}'.format(self.name)
