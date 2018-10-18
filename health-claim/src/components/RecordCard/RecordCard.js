import React from "react";
import PropTypes from "prop-types";
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

RecordCard.propTypes = {
  record: PropTypes.object.isRequired,
  onClick: PropTypes.func
};

RecordCard.DefaultProps = {
  onClick: () => {} //noop
};

export default RecordCard;
