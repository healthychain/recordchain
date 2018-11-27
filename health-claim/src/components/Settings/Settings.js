//@flow

import * as React from "react";
import { Table} from "reactstrap";
import "./Settings.scss";

type Props = {
  createMasterSecret: Fucntion
};

type State = {
  masterSecret: String,
  did: String
};

class Settings extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      masterSecret: ""
    };
  }

  handleUpdateMasterSecret = event => {
    this.setState({ masterSecret: event.target.value });
  };

  render() {
    const { createMasterSecret, did } = this.props;
    return (
      <div className="Settings__container">
        <div className="Settings__inner_container">
        <Table hover>
        <tbody>
          <tr>
          <div className="Settings__row">
           <th scope="row"><div className="Settings__row__name"> Your DID </div> </th> 
           <td> <div className="Settings__input__container">{did}</div> </td> 
          </div>
          </tr>
          <tr>
          <div className="Settings__row">
            <th scope="row"><div className="Settings__row__name">Master secret</div> </th>
            <td><div className="Settings__input__container">
              <input 
                value={this.state.masterSecret}
                onChange={this.handleUpdateMasterSecret}
              />
             </div>
            </td>
          </div>
          </tr>
          </tbody>
          </Table>
          <div className="Settings__row">
            <div
              className="Button Button__Green"
              onClick={() => createMasterSecret(this.state.masterSecret)}
            >
              Submit
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
