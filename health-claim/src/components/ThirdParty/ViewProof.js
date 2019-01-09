import * as React from "react";

class ViewProof extends React.Component {
  componentDidMount() {
    const { tpView, match } = this.props;
    const username = match.params.username;
    tpView(username);
  }

  render() {
    const { proof, match } = this.props;
    const username = match.params.username;
    return (
      <div className="dashboard-layout">
        <div className="dashboard-main">
          <div className="dashboard-inner-alt">
            <div className="Box">
              <h1 className="Page__Title">{`View the requested health record of: ${username}`}</h1>
              <div className="separator" />
              {proof && Object.keys(proof).length !== 0 ? (
                Object.keys(proof).map((key, idx) => (
                  <div className="HealthRecord__cell" key={key}>
                    <div className="Flex__Column">
                      <div className="HealthRecord__key">
                        <label className="HealthRecord__key__text">
                          {key[0].toUpperCase() + key.substring(1)}
                        </label>
                      </div>
                      <div className="HealthRecord__key_sep" />
                    </div>
                    <dic
                      className="Flex__Column"
                      style={{ width: "100%", height: "39px" }}
                    >
                      <div className="HealthRecord__value">
                        <div className="HealthRecord__Input">
                          <p style={{ padding: "0", margin: "0" }}>
                            {proof[key]}
                          </p>
                        </div>
                        {idx + 1 !== Object.keys(proof).length && (
                          <div className="HealthRecord__value_sep" />
                        )}
                      </div>
                    </dic>
                  </div>
                ))
              ) : (
                <p>Couldn't find the health record of that user</p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewProof;
