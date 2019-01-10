import React, { Component } from "react";
import AttributeRequest from "./AttributeRequest";
import "../Doctor/Doctor.scss";
import "../Login/LoginForm.scss";

export default class RequestBuilder extends Component {
  constructor(props) {
    super(props);

    this.state = { attributeRequests: [{ name: "", p_type: "", p_value: "" }] };
  }

  componentDidMount() {
    this.props.fetchCredDef();
  }

  // Get backend operator for specific predicate
  getOp = predicate => {
    let text;
    switch (predicate) {
      case "less than":
        text = "<=";
        break;
      case "more than":
        text = ">=";
        break;
      default:
        text = "==";
        break;
    }
    return text;
  };

  // Callback for setting values of AttributeRequest components
  valueCallback = (idx, fieldType, value) => {
    console.log("CALLED WITH " + value);
    this.setState(oldState => {
      let modifiedState = oldState;
      console.log(oldState);
      modifiedState.attributeRequests[idx][fieldType] = value;
      console.log(modifiedState);
      return modifiedState;
    });
  };

  // Add another AttributeRequest component to the form
  addAttributeRequest = e => {
    this.setState(prevState => ({
      attributeRequests: [
        ...prevState.attributeRequests,
        { name: "", p_type: "", p_value: "" }
      ]
    }));
  };

  handleSubmit = e => {
    const { username, domain } = this.state;
    const req_attrs = [];
    const req_pred = [];

    this.state.attributeRequests.map(req => {
      if (req.name && req.p_value && req.p_type) {
        req_pred.push({
          name: req.name,
          p_type: this.getOp(req.p_type),
          p_value: req.p_value
        });
      } else if (req.name) {
        req_attrs.push(req.name);
      }
    });
    req_pred.map(pred => req_attrs.push(pred.name));
    this.props.setPredicates(req_pred);
    this.props.tpRequest(username, domain, req_attrs, []);
  };

  render() {
    const { attributeRequests } = this.state;
    const { credDef } = this.props;
    console.log(this.state);
    const types = {
      string: ["value", "equals"],
      number: ["value", "equals", "less than", "more than"]
    };

    let newCredDef = [];
    let fields = {};
    credDef.map(def => newCredDef.push(JSON.parse(def)));

    newCredDef.map(attribute => {
      fields[attribute.name] = attribute.type;
    });
    return (
      <div>
        <div className="Form__Rack">
          <div className="Form__Cell">
            <label className="Input__Label">
              Request proof from user (DID)
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
          {attributeRequests.map(({ name, p_type, p_value }, idx) => {
            return (
              <AttributeRequest
                valueCallback={this.valueCallback}
                idx={idx}
                types={types}
                attributes={fields}
                name={name}
                p_type={p_type}
                p_value={p_value}
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
