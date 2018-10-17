import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./containers/Login";
import Claim from "./containers/Claim.js";
import Doctor from "./containers/Doctor";
import NotFound from "./containers/NotFound";

export default ({ childProps }) =>
    <Switch>
        <Route path="/" exact component={Login} props={childProps} />
        <Route path="/claim" exact component={Claim} props={childProps} />
        <Route path="/doctor" exact component={Doctor} props={childProps} />
        <Route path="/login" exact component={Login} props={childProps} />
        { /* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
    </Switch>;