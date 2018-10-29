import React, { Component } from "react";
import { Table, Container, Row, Col} from "reactstrap";
import PropTypes from "prop-types";
import "./PatientView.css";

class PatientView extends Component {
  componentDidMount() {
    const { id } = this.props;
    this.props.fetchClaims(id);
  }

  componentWillReceiveProps(newProps) {
    const { id } = this.props;
    const newId = newProps.id;

    if (newId !== id) {
      this.props.fetchClaims(newId);
    }
  }

  renderInfo(info) {
    return info.map((item) => {
      return (
        <tr>
          <th>{item.key}</th>
          <th>{item.value}</th>
        </tr>
      )
    })
  }

  renderClaims(claims) {
    return claims.map((claim, index) => {
      var newIndex = index + 1;
      return <div>
               <h5 className="claim-title"> Claim {newIndex} </h5>
               <tr>{claim.title}</tr>
              </div>
    })
  }

  render = () => {

    const info = [
      { key: "Name", value: this.props.name },
      { key: "ID", value: this.props.id },
      { key: "DOB", value: "23/04/1977" },
    ]

    return (
      <Container className="patient-view-container">
        {this.props.loading ? (
          <p>Loading</p>
        ) : (
          <Row>
            <div className="info">
            <Col className="patient-view-column">
              {" "}
              <img
                alt="patient"
                className="patient-img"
                src="http://www.rw-designer.com/icon-image/14771-256x256x32.png"
              />
              <Table>
                <tbody>
                  {this.renderInfo(info)}
                </tbody>
              </Table>
            </Col>
            </div>
            <Col className="patient-view-column">
              <Table hover className="claim-table">
                <tbody>
                  {this.renderClaims(this.props.claims)}
                </tbody>
              </Table>
            </Col>
          </Row>
        )}
      </Container>
    );
  };
}

PatientView.propTypes = {
  loading: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  birthDate: PropTypes.instanceOf(Date).isRequired,
  claims: PropTypes.array
};

PatientView.defaultProps = {
  claims: []
};

export default PatientView;
