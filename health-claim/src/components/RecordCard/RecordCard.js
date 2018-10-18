import React, { Component } from "react";
import "./RecordCard.css";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";

class RecordCard extends Component {
  render() {
    const { record, onClick } = this.props;
    return (
      <Card className="card" onClick={onClick}>
        <CardBody>
          <CardTitle>{record.title}</CardTitle>
          <CardText>{record.description}</CardText>
          <Button color="link">Open the record</Button>
        </CardBody>
      </Card>
    );
  }
}

export default RecordCard;