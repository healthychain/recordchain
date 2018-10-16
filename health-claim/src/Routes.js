import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import Claim from "./containers/Claim.js";
import NotFound from "./containers/NotFound";

export default ({ childProps }) =>
    <Switch>
        <Route path="/" exact component={Login} props={childProps} />
        <Route path="/claim" exact component={Claim} props={childProps} />
        { /* Finally, catch all unmatched routes */}
        <Route component={NotFound} />\
    </Switch>;