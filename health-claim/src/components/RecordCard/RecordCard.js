import React, { Component } from "react";
import "./RecordCard.css";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";

const RecordCard = props => {
  const { record, onClick } = props;
  return (
    <Card className="card" onClick={onClick}>
      <CardBody>
        <CardTitle>{record.title}</CardTitle>
        <CardText>{record.description}</CardText>
        <Button color="link">Open the record</Button>
      </CardBody>
    </Card>
  );
};

export default RecordCard;
