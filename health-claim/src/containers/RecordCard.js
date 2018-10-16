import React, { Component } from 'react';
import './RecordCard.css';
import {
    Card, CardText, CardBody,
    CardTitle, Button,
} from 'reactstrap';

export default class RecordCard extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            record: props.record,
            onClick: props.onClick
        }
        this.state = props
    }

    render() {
        const record = this.state.record;
        const onClick = this.state.onClick;
        return (
            <Card className="card" onClick={onClick}>
                <CardBody>
                    <CardTitle>{record.title}</CardTitle>
                    <CardText>{record.description}</CardText>
                    <Button color="link">Open the record</Button>
                </CardBody>
            </Card>
        )
    }
}