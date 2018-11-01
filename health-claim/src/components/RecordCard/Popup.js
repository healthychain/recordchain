import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const record_data = [{
    "name": "Irina",
    "age": "21",
    "dob": "01/06/1997",
    "address": "London",
    "general": {
        "heartbeat": "good",
        "bloodpressure": "",
        "surgeries": "none"
    },
    "eyesight": "good",
    "medications": {
        "medication1": "a",
        "medication2": "b"
    }
}]

class ModalExample extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      modal: false,
      json: []
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
    this.setState((prevState) => {
        return {
            json: record_data
        }
    })
}
    

  render() {
    return (
      <div>
        <Button color="link" onClick={this.toggle}>Open the record</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Health record 1</ModalHeader>
          <ModalBody>

            <div>
                <table>
                    <thead>
                        {/* <th>FirsName</th>
                        <th>Last Name</th> */}
                    </thead>
                    <tbody>
                        {this.state.json.map((data, i) => {
                            return (
                                <tr key={i}>
                                <div>
                                    <td><b> Name: </b> {data.name} 
                                    <br />
                                    <b> Age: </b> {data.age}
                                    <br />
                                    <b> Date of Birth: </b> {data.dob}
                                    <br />
                                    <b> Address: </b> {data.address}
                                    <br />
                                    <b> General: </b> <br />
                                    <b> {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'} Heartbeat: </b> {data.general.heartbeat}   <br />
                                    <b> {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'} Blood pressure: </b> {data.general.bloodpressure}   <br />
                                    <b> {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'} Surgeries: </b> {data.general.surgeries}                              
                                    <br />
                                    <b> Eyesight: </b> {data.eyesight}
                                    <br />
                                    <b> Medications: </b> <br />
                                    <b> {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'} Medication 1: </b> {data.medications.medication1}   <br />
                                    <b> {'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'} Medication 2: </b> {data.medications.medication2}   <br />
                                    </td>
                                </div>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalExample;