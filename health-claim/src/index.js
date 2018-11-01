import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import Store from "./store";
import * as serviceWorker from "./serviceWorker";
import AppContainer from "./containers/AppContainer";

const store = Store();

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router>
        <AppContainer />
      </Router>
    </Provider>
  </div>,
  document.getElementById("root")
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
