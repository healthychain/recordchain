import React, { Component } from "react";
import Grid from "../components/Grid";
import "./Score.css";

//The main 'HOME' component. If one is logged in, the credit score dashboard
//is shown, otherwise one sees the home page that only has website name on it.
export default class Score extends Component {

    async componentDidMount() {
        this.setState({ isLoading: false });
    }

    //Lander shown to unauthenticated users
    renderLander() {
        return (
            <div className="lander">
                <h1>OPAL Credit</h1>
                <p>Check your credit score safely and easily</p>
            </div>
        );
    }

    //Score shown to authenticated users - React Grid component
    //contains the details.
    renderScore() {
        const result = this.props.result;
        const score = result.score;
        const percentile_score = result.percentile_score;
        const monthly_spending = result.monthly_spending;
        const total_payments = result.total_payments;
        const late_payments = result.late_payments;
        return (
            <Grid score={score} props={this.props} percentile_score={percentile_score} monthly_spending={monthly_spending} total_payments={total_payments} late_payments={late_payments} />
        );
    }

    render() {
        return (
            <div className="Home">
                {this.props.isAuthenticated ? this.renderScore() : this.renderLander()}
            </div>
        );
    }
}
