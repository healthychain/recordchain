import React, { Component } from "react";
import LoaderButton from "../components/LoaderButton";
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import { FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            access_token: "no token found yet",
            callback_url: props.callback_url
        };
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0
        );
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    //Function called by the login button that updates the app state to loading
    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });

    }


    // render() {
    //     return (
    //         <div className="Login">
    //             <form onSubmit={this.handleSubmit}>
    //                 <LoaderButton
    //                     block
    //                     bsSize="large"
    //                     type="submit"
    //                     isLoading={this.state.isLoading}
    //                     text="Login using OpenID"
    //                     loadingText="Logging in…"
    //                     href={this.state.callback_url}
    //                 />
    //             </form>
    //         </div>
    //     );
    // }

    render() {
        const options = [
            'Patient', 'Doctor'
        ]
        const defaultOption = options[0];
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>

                    I'm a:
                    <br></br>
                    <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Select an option" />
                    <br></br>

                    <LoaderButton
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                        isLoading={this.state.isLoading}
                        text="Login"
                        loadingText="Loging in…"
                    />
                </form>
            </div>
        );
    }
}