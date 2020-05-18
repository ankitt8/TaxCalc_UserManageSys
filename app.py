from flask import Flask, render_template,jsonify, request,  make_response, json, session, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy


from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import os

# from models import user
# from models.user import User

# from os import environ

class Config(object):
    # SESSION_TYPE = 'sqlalchemy'
    
    # env_var = dict(os.environ)
    # print(env_var)
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
    # print('{}'.format(SQLALCHEMY_DATABASE_URI))
    # I have to fix one of logged in error
    SECRET_KEY='\xf5\xd4\x90sd\xed\xa8\xf6\x867B\n\xd0\xdcR\xb1'
    # SECRET_KEY=os.environ.get('SECRET_KEY')
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS=False


app = Flask(__name__)
app.config.from_object(Config)


db = SQLAlchemy(app)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), primary_key=True)
    phone = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(70), nullable=False)
    city = db.Column(db.String(30), nullable=False)
    password = db.Column(db.String(1000), nullable=False)
    role = db.Column(db.String(10), nullable=False)
    #User(name='Ankit', phone='1111111111', email='ankit90499@gmail.com', city='Pune', password=)
    def __repr__(self):
        return '{}'.format(self.name)


# this should be run only once and only at the start of the project to create the table user
# db.create_all()
# db.session.commit()

def required_login(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        
        if not session['logged_in']:
            return redirect(url_for('login'))

        return f(*args, **kwargs)

    return decorated_function


@app.route('/')
# I have to fix one of logged in error hence i have commented required login approach
# @required_login
def index():
    return render_template('index.html')



@app.route('/login', methods=["POST", "GET"])
def login():
    if request.method == 'GET':
        #print('get')
        return render_template('login.html')
    
    user_name = request.form['username']
    password = request.form['password']
    username_row = User.query.filter_by(name=user_name).count()
    print(username_row)
    if not username_row:
        flash('Invalid Credentials', 'danger')
        session['logged_in'] = False
        return redirect(url_for('login'))

    hashed_string = User.query.filter_by(name=user_name).first().password
    password_correct = check_password_hash(hashed_string,password)
        
    if password_correct:
        session['logged_in'] = True
        return redirect(url_for('index'))   # to learn how to redirect to next so that user is redirected to the page where he left
    else:
        flash('Invalid Credentials', 'danger')
        session['logged_in'] = False
        return redirect(url_for('login'))  


@app.route('/logout')
def logout():
    session['logged_in'] = False
    return redirect(url_for('login'))

@app.route('/fetch-users')
@required_login
def fetch_users():
   
    final_list= [{'id':k.id,'name':k.name, 'phone':k.phone, 'email':k.email, 'city':k.city, 'password':k.password, 'role':k.role} for k in User.query.all()]


    return jsonify(data= final_list)


@app.route('/add-user', methods=["POST"])
@required_login
def add_user():
    data = request.get_json(force=True)['user']
    hashed_string = generate_password_hash(data['password'])
    user = User(name=data['name'], phone=data['phone'], email=data['email'], city=data['city'], password=hashed_string, role=data['role'])
    db.session.add(user)
    db.session.commit()
    # resp = json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    # return resp
    return jsonify(200)


@app.route('/edit-user', methods=["POST"])
def edit_user():
    print(request.get_json(force=True))
    data = request.get_json(force=True)['user']
    userid = data['id'] 
    user = User.query.filter_by(id=userid).first()
    print(user)
    user.name = data['name']
    user.phone = data['phone']
    user.email = data['email']
    user.city = data['city']
    user.role = data['role']
    db.session.commit()
    # resp = json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    # return resp
    return jsonify()



@app.route('/delete-user', methods=["POST"])
def delete_user():
    
    userid = request.get_json(force=True)['userid']
    print(userid)
    print('Deleted {}'.format(userid))
    
    User.query.filter_by(id=userid).delete()
    db.session.commit()

    # resp = json.dumps({'success':True}), 200, {'ContentType':'application/json'}
    # return resp
    return jsonify()


if __name__=='__main__':
    app.run(port=8080, debug=True)


# data = dict( 
#     name = "Ankit",
#     phone = "9835198351",
#     email = "a@gmail.com",
#     city = "Pune",
#     password = generate_password_hash("Ankit@123"),
#     role = "Admin")

#  user1 = User(name='Ankit', phone='1111111111', email='ankit@gmail.com', city='Pune', password = generate_password_hash("Ankit@123"), role = "Admin")
# 'pbkdf2:sha256:150000$gI3y1Rcp$1f1ac50df66eff221bc07ab3a668957b1bd0126d69eeeef636ff551905dc0ae4'