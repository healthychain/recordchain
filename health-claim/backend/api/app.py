#!flask/bin/python
from flask import Flask, jsonify, make_response, abort, request
from flask_cors import CORS, cross_origin


app = Flask(__name__)

app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app)


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
    app.run(host=host, port=port)
    #app.run(debug=True)