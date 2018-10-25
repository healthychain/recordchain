#!flask/bin/python
from flask import Flask, jsonify, make_response, abort, request, redirect
from flask_cors import CORS, cross_origin
from flask_login import LoginManager, login_required, login_user, UserMixin, logout_user


app = Flask(__name__)

# config
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = 'yolo2018'

cors = CORS(app)

login_manager = LoginManager()


class User(UserMixin):

    def __init__(self, id):
        self.id = id
        self.name = "user" + str(id)

    def __repr__(self):
        return "%d/%s/%s" % (self.id, self.name)
    
users = [User(id) for id in range(1, 3)]


doctors_credentials = [
    {
        'username': 'doctor1',
        'password': 'psw1',
        'id': 1
    },
    {
        'username': 'doctor2',
        'password': 'psw2',
        'id': 2
    }
]

patients_credentials = [
    {
        'username': 'patient1',
        'password': 'psw1',
        'id': 1
    },
    {
        'username': 'patient2',
        'password': 'psw2',
        'id': 2
    },
    {
        'username': 'patient3',
        'password': 'psw3',
        'id': 3
    }
]



claims = [
    {
        'patient': 1,
        'id': 1,
        'title': u'General health record',
        'validated': False
    },
    {
        'patient': 1,
        'id': 2,
        'title': u'Cardiovascular record',
        'validated': True
    },
    {
        'patient': 1,
        'id': 3,
        'title': u'Allergies report',
        'validated': True
    },
    {
        'patient': 2,
        'id': 4,
        'title': u'Address',
        'validated': True
    },
    {
        'patient': 2,
        'id': 5,
        'title': u'Age',
        'validated': False
    },
    {
        'patient': 2,
        'id': 6,
        'title': u'Weight',
        'validated': False
    },
    {
        'patient': 2,
        'id': 7,
        'title': u'Eye-test report',
        'validated': True
    },
    {
        'patient': 3,
        'id': 8,
        'title': u'Skin test',
        'validated': True
    },
    {
        'patient': 3,
        'id': 9,
        'title': u'Accident report',
        'validated': True
    }
]

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

@app.route('/login_patient', methods=['POST'])
def login_patient():
    username = request.json['username']
    password = request.json['password']
    matching_patient = [patient for patient in patients_credentials if patient['username'] == username]
    if len(matching_patient) > 0 and password == matching_patient[0]['password']:
        user = User(username[-1])
        print(username[-1])
        login_user(user)
        return make_response(jsonify({'result': 'success'}), 200)
    else:
        return abort(401)

@app.route('/login_doctor', methods=['POST'])
def login_doctor():
    username = request.json['username']
    password = request.json['password']
    matching_doctor = [doctor for doctor in doctors_credentials if doctor['username'] == username]
    if len(matching_doctor) > 0 and password == matching_doctor[0]['password']:
        user = User(username[-1])
        print(username[-1])        
        login_user(user)
        return make_response(jsonify({'result': 'success'}), 200)
    else:
        return abort(401)

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return make_response(jsonify({'result': 'success'}), 200)




@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)

@app.route('/api/claims', methods=['GET'])
@cross_origin()
def get_claims():
    return jsonify({'claims': claims})


@app.route('/api/claims/<int:claim_id>', methods=['GET'])
@cross_origin()
def get_claim(claim_id):
    claim = [claim for claim in claims if claim['id'] == claim_id]
    if len(claim) == 0:
        abort(404)
    return jsonify({'claim': claim[0]})


@app.route('/api/patients-claims/<int:patient_id>', methods=['GET'])
@cross_origin()
def get_patients_claim(patient_id):
    claim = [claim for claim in claims if claim['patient'] == patient_id]
    if len(claim) == 0:
        abort(404)
    return jsonify({'claims': claim})






@app.route('/api/claims', methods=['POST'])
@cross_origin()
def create_claim():
    if not request.json or not 'title' in request.json:
        abort(400)
    claim = {
        'patient': request.json['patient'],
        'id': claims[-1]['id'] + 1,
        'title': request.json['title'],
        'validated': False
    }
    claims.append(claim)
    return jsonify({'claim': claim}), 201


@app.route('/api/<int:claim_id>', methods=['PUT'])
@cross_origin()
def update_claim(claim_id):
    claim = [claim for claim in claims if claim['id'] == claim_id]
    if len(claim) == 0:
        abort(404)
    if not request.json:
        abort(400)
    if 'title' in request.json and type(request.json['title']) != unicode:
        abort(400)
    if 'validated' in request.json and type(request.json['done']) is not bool:
        abort(400)
    claim[0]['title'] = request.json.get('title', claim[0]['title'])
    claim[0]['validated'] = request.json.get('validated', claim[0]['validated'])
    return jsonify({'claim': claim[0]})

@app.route('/api/claim/<int:claim_id>', methods=['DELETE'])
@cross_origin()
def delete_claim(claim_id):
    claim = [claim for claim in claims if claim['id'] == claim_id]
    if len(claim) == 0:
        abort(404)
    claims.remove(claim[0])
    return jsonify({'result': True})


if __name__ == '__main__':
    host = '0.0.0.0'
    port = 5000
    if host is None:
        host = '0.0.0.0'
    if port is None:
        server_name = self.config['SERVER_NAME']
        if server_name and ':' in server_name:
            port = int(server_name.rsplit(':', 1)[1])
        else:
            port = 5000

    login_manager.init_app(app)
    app.run(host=host, port=port)
    #app.run(debug=True)