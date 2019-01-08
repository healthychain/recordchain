//@flow

import * as React from "react";

import LoadingScreen from "../Loading/LoadingScreen";

type Props = {
  verifySession: Function,
  token: String,
  verifySessionLoading: Boolean,
  verifySessionError: Boolean
};

class SessionAuthenticator extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.verifySession(this.props.token);
  }

  componentWillReceiveProps() {
    console.log(this.props);
  }

  render() {
    const { verifySessionLoading, verifySessionError, children } = this.props;
    return verifySessionLoading ? <LoadingScreen /> : children;
  }
}

export default SessionAuthenticator;
