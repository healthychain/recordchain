import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap';

const record_data = [{
    "name": "Irina Danes",
    "age": "21",
    "dob": "01/06/1997",
    "address": "London",
    "general": {
        "heartbeat": "good",
        "bloodpressure": "good",
        "surgeries": "none"
    },
    "eyesight": "good",
    "medications": "none",
    "allergies": "none"
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
                <Table hover>
                    <tbody>
                    {this.state.json.map((data, i) => {
                        return (
                            <div>
                            <tr key={i}>
                                <th scope="row">Name</th>
                                <td>{data.name}</td>
                                </tr>
                                <tr>
                                <th scope="row">Age</th>
                                <td>{data.age}</td>
                            </tr>
                            <tr>
                                <th scope="row">Date of Birth</th>
                                <td>{data.dob}</td>
                            </tr>
                            <tr>
                                <th scope="row">Address</th>
                                <td>{data.address}</td>
                            </tr>
                            <tr>                            

                                <th scope="row"><br />General</th>
                            </tr>
                            <tr>
                                {/* <th scope="row"></th> */}
                                <td>Heartbeat</td>
                                <td>{data.general.heartbeat}</td>
                            </tr>
                            <tr>
                                {/* <th scope="row"></th> */}
                                <td>Blood Pressure</td>
                                <td>{data.general.bloodpressure}</td>
                            </tr>
                            <tr>
                                {/* <th scope="row"></th> */}
                                <td>Surgeries</td>
                                <td>{data.general.surgeries}</td>
                            </tr>
                            <tr>
                                <td>Eyesight</td>
                                <td>{data.eyesight}</td>
                            </tr>
                            <tr>
                                <th scope="row"><br />Prescribed Medications</th>
                                <td><br />{data.medications}</td>
                            </tr>
                            <tr>
                                <th scope="row">Allergies</th>
                                <td>{data.allergies}</td>
                            </tr>
                            </div>
                        )
                    })}
                </tbody>
            </Table>
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