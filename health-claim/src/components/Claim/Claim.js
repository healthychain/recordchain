import React, { Component } from "react";
import "./Claim.css";
import { Button } from "reactstrap";
import RecordCard from "../RecordCard/RecordCard";
import Header from "../Header/Header";
import "bootstrap/dist/css/bootstrap.css";

export default class Claim extends Component {
  handleClick() {}

  renderRecords(records) {
    return (
      <div className="health-records">
        {records.map(record => (
          <div>
            <RecordCard record={record} onClick={this.handleClick} />
          </div>
        ))}
      </div>
    );
  }

  render() {
    const healthRecord1 = {
      title: "Health record 1",
      description: "Issued by doctor Smith"
    };
    const healthRecord2 = {
      title: "Health record 2",
      description: "Issued by doctor Ben"
    };
    const healthRecord3 = {
      title: "Health record 3",
      description: "Issued by doctor Michael"
    };

    const records = [healthRecord1, healthRecord2, healthRecord3];

    return (
      <div>
        <div>
          <Header />
        </div>
        <div class="record-select">
          <h4 className="record-text">Choose one of your health records:</h4>
          {this.renderRecords(records)}
          <div className="records-button">
            <Button color="link">See older health records</Button>
          </div>
        </div>
        <div className="bar"> </div>
        <div className="make-claim">
          <h5> Make a claim </h5>
          <text> Choose the type of your claim: </text>
        </div>
        <Button className="claim-button">Post claim</Button>
      </div>
    );
  }
}
