import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Claim from "./components/Claim/Claim.js";
import Doctor from "./components/Doctor/Doctor";
import NotFound from "./components/NotFound/NotFound";

export default ({ childProps }) => (
  <Switch>
    <Route path="/" exact component={Login} props={childProps} />
    <Route path="/patient" exact component={Claim} props={childProps} />
    <Route path="/doctor" exact component={Doctor} props={childProps} />
    <Route path="/login" exact component={Login} props={childProps} />
    {/* Finally, catch all unmatched routes */}
    <Route component={NotFound} />
  </Switch>
);
