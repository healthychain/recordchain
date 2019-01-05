import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Table} from 'reactstrap';

const record_data = [{
    "Name": "David Smith",
    "Age": "21",
    "Date of Birth": "01/06/1997",
    "Address": "London",
    "Heartbeat": "good",
    "Blood Pressure": "good",
    "Surgeries": "none",
    "Eyesight": "good",
    "Medications": "none",
    "Allergies": "none"
}]

var keys = Object.keys(record_data[0]);
var values = Object.values(record_data[0]);

var data = [];
for (var i = 0; i < keys.length; i++) { 
    var row = {"key": keys[i], "value": values[i]};
    data.push(row);
}

var columns = [
    { key: 'key', label: '' },    
    { key: 'value', label: '' },
];

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

    generateRows() {
        return data.map(function(item) {
            var cells = columns.map(function(colData) {
                return <td> {item[colData.key]} </td>;
            });
        return <tr key={item.id}> {cells} </tr>;
        });
    }

    render() {
        var rowComponents = this.generateRows();
        return (
            <div>
            <Button color="link" onClick={this.toggle}>Open the record</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <ModalHeader toggle={this.toggle}><b>Health record 1</b></ModalHeader>
            <ModalBody>
                <Table hover>
                    <tbody> {rowComponents}</tbody> 
                </Table>
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