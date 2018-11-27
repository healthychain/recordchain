import React, { Component } from "react";
import AttributeRequest from "./AttributeRequest";
import "../Doctor/Doctor.scss";
import "../Login/LoginForm.scss";

export default class RequestBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = { attributeRequests: [{ name: "", p_type: "", p_val: "" }] };
  }

  // Get backend operator for specific predicate
  getOp = predicate => {
    let text;
    switch (predicate) {
      case "less than":
        text = "<";
        break;
      case "more than":
        text = ">";
        break;
      default:
        text = "==";
        break;
    }
    return text;
  };

  // Callback for setting values of AttributeRequest components
  valueCallback = (idx, fieldType, value) => {
    this.setState(oldState => {
      let modifiedState = oldState;
      modifiedState.attributeRequests[idx][fieldType] = value;
      return modifiedState;
    });
  };

  // Add another AttributeRequest component to the form
  addAttributeRequest = e => {
    this.setState(prevState => ({
      attributeRequests: [
        ...prevState.attributeRequests,
        { name: "", p_type: "", p_val: "" }
      ]
    }));
  };

  // TODO: send to backend
  handleSubmit = e => {
    const { username, domain } = this.state;
    console.log(this.state);
    const req_attrs = [];
    const req_pred = [];

    this.state.attributeRequests.map(req => {
      if (req.name && req.p_val && req.p_type) {
        req_pred.push({
          name: req.name,
          p_type: this.getOp(req.p_type),
          p_val: req.p_val
        });
      } else if (req.name) {
        req_attrs.push(req.name);
      }
    });
    console.log(req_attrs);
    console.log(req_pred);
    this.props.tpRequest(username, domain, req_attrs, req_pred);
  };

  render() {
    const { attributeRequests } = this.state;
    const types = {
      string: ["value", "equals"],
      number: ["value", "equals", "less than", "more than"]
    };

    const fields = {
      age: "number",
      name: "string"
    };

    return (
      <div>
        <div className="Form__Rack">
          <div className="Form__Cell">
            <label className="Input__Label">
              Request stuff from user (DID)
            </label>
            <input
              onChange={e => this.setState({ username: e.target.value })}
              className="Input__Text"
              type="text"
              value={this.state.username}
            />
            <br />
            <label className="Input__Label">Domain</label>
            <input
              onChange={e => this.setState({ domain: e.target.value })}
              className="Input__Text"
              value={this.state.domain}
              type="text"
              name="domain"
            />
          </div>
          <br />
          <label className="Input__Label">Attributes</label>
          {attributeRequests.map(({ name, p_type, p_val }, idx) => {
            return (
              <AttributeRequest
                valueCallback={this.valueCallback}
                idx={idx}
                types={types}
                attributes={fields}
                name={name}
                p_type={p_type}
                p_val={p_val}
              />
            );
          })}
          <br />
          <button
            type="button"
            className="Button Button__Secondary Button__Smaller"
            onClick={this.addAttributeRequest}
          >
            Add attribute
          </button>
        </div>
        <button className="Button Button__Green" onClick={this.handleSubmit}>
          Request
        </button>
        <form />
      </div>
    );
  }
}
