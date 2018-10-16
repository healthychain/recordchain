import React, { Component } from "react";
import "./Doctor.css"

export default class Doctor extends Component {

    async componentDidMount() {
        this.setState({ isLoading: false });
    }

    //Lander shown to unauthenticated users
    renderLander() {
        return (
            <div className="lander">
                <h1>HealthClaim</h1>
                <p>Welcome doctor</p>
            </div>
        );
    }

    render() {
        return (
            <div className="Home">
                {this.renderLander()}
            </div>
        );
    }
}
