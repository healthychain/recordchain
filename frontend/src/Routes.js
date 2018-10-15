import React from "react";
import { Route, Switch } from "react-router-dom";
import About from "./containers/About";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Score from "./containers/Score";
import NotFound from "./containers/NotFound";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Score} props={childProps} />
        <Route path="/about" exact component={About} props={childProps} />
        <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
        <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
        <AuthenticatedRoute path="/score" exact component={Score} props={childProps} />
        { /* Finally, catch all unmatched routes */}
        <Route component={NotFound} />
    </Switch>;