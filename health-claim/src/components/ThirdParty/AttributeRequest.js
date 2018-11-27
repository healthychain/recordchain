import React, { Component } from "react";
import "./AttributeRequest.scss";
import "../Doctor/Doctor.scss";
import "../Login/LoginForm.scss";

class AttributeRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attribute: null,
      predicate: null,
      input: null
    };

    this.types = this.types.bind(this);
    this.predicates = this.predicates.bind(this);
  }

  types(types) {
    return types.map(type => (
      <option key={type} value={type}>
        {type}
      </option>
    ));
  }

  getPredicates = attribute => {
    const attributeType = this.props.attributes[attribute];
    return this.props.types[attributeType];
  };

  // Return predicates for specific type
  predicates(type) {
    return type.map(predicate => (
      <option key={predicate} value={predicate}>
        {predicate}
      </option>
    ));
  }

  selectValue = event => {
    this.setState({ input: event.target.value });
  };

  selectAttributes = event => {
    event.target.value === "dummy"
      ? this.setState({ attribute: null })
      : this.setState({ attribute: event.target.value });
  };

  selectPredicate = event => {
    this.setState({ predicate: event.target.value });
  };

  render() {
    const selectedAttribute = this.state.attribute;
    const inputType =
      this.props.attributes[selectedAttribute] === "number" ? "number" : "text";
    console.log(this.state);
    return (
      <>
        <label className="Input__Label">{this.props.name}</label>
        <div className="Request__Field__Container">
          <select
            value={this.state.attribute}
            onChange={this.selectAttributes}
            className="Input__Dropdown"
          >
            <option value="dummy">Request</option>
            {this.types(Object.keys(this.props.attributes))}
          </select>

          {this.state.attribute ? (
            <>
              <select
                value={this.state.predicate}
                onChange={this.selectPredicate}
                className="Input__Dropdown"
              >
                {this.predicates(this.getPredicates(selectedAttribute))}
              </select>
              <input
                value={this.state.input}
                onChange={this.selectValue}
                className="Input__Text__Variable"
                type={inputType}
              />
            </>
          ) : null}
        </div>
      </>
    );
  }
}

export default AttributeRequest;
