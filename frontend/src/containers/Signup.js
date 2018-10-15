import React, { Component } from "react";
import { HelpBlock, FormGroup, FormControl, ControlLabel, Checkbox } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";

export default class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            confirmPassword: "",
            confirmationCode: "",
            newUser: null,
            transactionsConsent: false,
            insuranceConsent: false,
            telcoConsent: false
        };
    }

    validateForm() {
        return (
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
            //&& (this.state.transactionsConsent || this.state.insuranceConsent || this.state.telcoConsent)
        );
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }

    handleChangeTransactionsConsent = event => {
        this.setState({
            transactionsConsent: !this.state.transactionsConsent
        });
    }

    handleChangeInsuranceConsent = event => {
        this.setState({
            insuranceConsent: !this.state.insuranceConsent
        });
    }

    handleChangeTelcoConsent = event => {
        this.setState({
            telcoConsent: !this.state.telcoConsent
        });
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        if (!this.state.transactionsConsent && !this.state.insuranceConsent && !this.state.telcoConsent) {
            alert("You have to give consent to use at least one data source before proceeding.")
            return;
        }

        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            const newUser = undefined;
            // const newUser = await Auth.signUp({
            //     username: this.state.email,
            //     password: this.state.password,
            //     attributes: {
            //         'custom:transactions': '' + this.state.transactionsConsent,
            //         'custom:insurance': '' + this.state.insuranceConsent,
            //         'custom:telco': '' + this.state.telcoConsent
            //     }
            // });
            this.setState({
                newUser
            });
        } catch (e) {
            alert(e.message);
        }

        this.setState({ isLoading: false });
    }

    handleConfirmationSubmit = async event => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            // await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
            // await Auth.signIn(this.state.email, this.state.password);

            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch (e) {
            alert(e.message);
            this.setState({ isLoading: false });
        }
    }

    renderConfirmationForm() {
        return (
            <form onSubmit={this.handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <ControlLabel>Confirmation Code</ControlLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        value={this.state.confirmationCode}
                        onChange={this.handleChange}
                    />
                    <HelpBlock>DEPRECATED - Please check your email for the code.</HelpBlock>
                </FormGroup>
                <LoaderButton
                    block
                    bsSize="large"
                    disabled={!this.validateConfirmationForm()}
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Verify"
                    loadingText="Verifying…"
                />
            </form>
        );
    }

    renderForm() {
        return (
            <form onSubmit={this.handleSubmit}>
                DEPRECATED
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
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <LoaderButton
                    block
                    bsSize="large"
                    disabled={!this.validateForm()}
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Signup"
                    loadingText="Signing up…"
                />

                I consent to OPAL using my:
                <br></br>
                <Checkbox controlId="transactionsConsent" onClick={this.handleChangeTransactionsConsent} inline>
                    Card transaction data
                </Checkbox>
                <Checkbox controlId="insuranceConsent" onClick={this.handleChangeInsuranceConsent} inline>
                    Insurance data
                </Checkbox>
                <Checkbox controlId="telcoConsent" onClick={this.handleChangeTelcoConsent} inline>
                    Telecommunications provider data
                </Checkbox>
            </form>
        );
    }

    render() {
        return (
            <div className="Signup">
                {this.state.newUser === null
                    ? this.renderForm()
                    : this.renderConfirmationForm()}
            </div>
        );
    }
}