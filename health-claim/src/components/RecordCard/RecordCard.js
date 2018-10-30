import React from "react";
import PropTypes from "prop-types";
import "./RecordCard.css";
import { Card, CardText, CardBody, CardTitle, Button } from "reactstrap";

const RecordCard = props => {
  const { record, onClick, isSelected } = props;

  const style = isSelected ? {borderColor: "#FFFF00"} : null;
  return (
    <Card onClick={onClick} style={style}>
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
