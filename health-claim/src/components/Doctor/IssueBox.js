import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class IssueBox extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      section: "",
      sectionData: ""
    };
  }
  handleChange = event => {
    if (event.target.name === "section")
      this.setState({ section: event.target.value });
    if (event.target.name === "sectionData")
      this.setState({ sectionData: event.target.value });
  };
  handleSubmit = event => {
    this.state.data.push({
      section: this.state.section,
      sectionData: this.state.sectionData
    });
    this.setState({ section: "", sectionData: "" });
    event.preventDefault();
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
        dangerouslySetInnerHTML={{
          __html: this.state.data[cellInfo.index][cellInfo.column.id]
        }}
      />
    );
  };
  render() {
    const { data } = this.state;
    console.log(this.state.data);
    return (
      <div>
        <p className="App-intro">
          <form onSubmit={this.handleSubmit}>
            <h3>Issue a new record</h3>
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
            className=" -highlight"
            showPaginationBottom={true}
            showPageSizeOptions={false}
          />
        </div>
      </div>
    );
  }
}
export default IssueBox;
