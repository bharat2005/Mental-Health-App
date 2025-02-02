from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt


app=Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///needhelp.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
bcrypt = Bcrypt(app)



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    gender = db.Column(db.String())
    marital_status = db.Column(db.String())
    age = db.Column(db.Integer)
    regNo = db.Column(db.Integer)
    password = db.Column(db.String())






@app.route('/register', methods=["POST"])
def register():
    data = request.get_json()
    if User.query.filter_by(regNo=data['regNo']).first():
        return jsonify({'message':"failed"})
    user = User(name=data['name'], gender=data['gender'], marital_status=data['marital_status'], age=data['age'],regNo=data['regNo'], password=bcrypt.generate_password_hash(data['password']).decode('utf-8'))
    db.session.add(user)
    db.session.commit()
    return jsonify({'message':"success"})


@app.route('/login',methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(regNo=data['regNo']).first()
    if user and bcrypt.check_password_hash(user.password,data['password']):
        return jsonify({'message':"success"})
    return jsonify({'message':'failed'})


@app.route('/mood',methods=["POST"])
def mood():
    data = request.get_json()
    # This data can be used for further individual's personal assistance!
    return jsonify({'this_data_can_be_used_further':data})





if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)