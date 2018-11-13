import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import { apiEndpoint } from "../../apiEndpoint";

class IssueBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      section: "",
      sectionData: ""
    };
    this.handleSubmitIssue = this.handleSubmitIssue.bind(this);
  }
  handleSubmitAddRow = event => {
    this.state.data.push({
      section: this.state.section,
      sectionData: this.state.sectionData
    });
    this.setState({ section: "", sectionData: "" });
    console.log(this.state.data);
    event.preventDefault();
  };

  handleSubmitIssue = event => {
    //JSONify each data row
    for (var i = 0; i < this.state.data.length; i++) {
      this.state.data[i] = JSON.stringify(this.state.data[i]);
    }

    return fetch(
      `${apiEndpoint}/credential_offer?token=${
        this.props.sessionID
      }&prover_username=${this.state.username}`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "no-cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(this.state.data.join(",")) // body data type must match "Content-Type" header
      }
    );

    // fetch(
    //   `${apiEndpoint}/credential_offer?token=${
    //     this.props.sessionID
    //   }&prover_username=${this.state.username}`
    // );
  };
  renderEditable = cellInfo => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={e => {
          const data = [...this.state.data];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ data });
        }}
      />
    );
  };
  render() {
    const { data } = this.state;
    return (
      <div>
        <h3>Issue a new record</h3>
        <label className="Input__Label">Patient's username</label>
        <input
          onChange={e => this.setState({ username: e.target.value })}
          className="Input__Text"
          type="text"
          value={this.state.username}
        />
        <br /> <label className="Input__Label">Health record</label>
        <p className="App-intro">
          <form onSubmit={this.handleSubmitAddRow}>
            <input type="submit" value="Add section" />
          </form>
        </p>
        <div>
          <ReactTable
            data={data}
            columns={[
              {
                Header: "Section",
                accessor: "section",
                Cell: this.renderEditable,
                maxWidth: 100
              },
              {
                Header: "SectionData",
                accessor: "sectionData",
                Cell: this.renderEditable,
                maxWidth: 600
              }
            ]}
            defaultPageSize={5}
            className="-highlight"
            showPaginationBottom={true}
            showPageSizeOptions={false}
          />
        </div>
        <hr />
        <button
          onClick={() => this.handleSubmitIssue()}
          className="Button Button__Green"
        >
          Issue credentials
        </button>
      </div>
    );
  }
}
export default IssueBox;
