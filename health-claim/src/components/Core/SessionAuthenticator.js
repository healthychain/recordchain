//@flow

import * as React from "react";

type Props = {
  verifySession: Function,
  token: String,
  verifySessionLoading: Boolean,
  verifySessionError: Boolean
};

const LoadingScreen = () => <div>Loading</div>;

class SessionAuthenticator extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.verifySession(this.props.token);
  }

  render() {
    const { verifySessionLoading, verifySessionError, children } = this.props;
    return verifySessionLoading ? <LoadingScreen /> : children;
  }
}

export default SessionAuthenticator;
