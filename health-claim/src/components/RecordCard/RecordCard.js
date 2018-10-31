import React from "react";
import PropTypes from "prop-types";
import "./RecordCard.css";
import { Card, CardText, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import ModalExample from "./Popup.js"

const RecordCard = props => {
  const { record, onClick, isSelected } = props;

  const style = isSelected ? {borderColor: "#FFFF00"} : null;
  
  return (
    <Card onClick={onClick} style={style}>
      <CardBody>
        <CardTitle>{record.title}</CardTitle>
        <CardText>{record.description}</CardText>
        <ModalExample></ModalExample>
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
