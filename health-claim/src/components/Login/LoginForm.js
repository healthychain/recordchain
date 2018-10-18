import React from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import LoaderButton from "../LoaderButton/LoaderButton.js";
import PropTypes from "prop-types";

export default class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            email: "no email found yet",
            access_token: "no token found yet"
        };
    }

    static propTypes = {
        loginHandler: PropTypes.func.isRequired
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    //Function called by the login button that updates the app state to loading
    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        this.props.loginHandler({email: this.state.email});
    };

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup tag="fieldset">
                    <legend>Please select</legend>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />
                            Doctor
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />
                            Patient
                        </Label>
                    </FormGroup>
                    <FormGroup check>
                        <Label check>
                            <Input type="radio" name="radio1" />
                            Insurance Company
                        </Label>
                    </FormGroup>
                </FormGroup>
                <FormGroup>
                    <legend for="exampleEmail">Email or OpenID</legend>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Write your email or your Id" />
                </FormGroup>
                <FormGroup>
                    <legend for="examplePassword">Password</legend>
                    <Input type="password" name="password" id="examplePassword" placeholder="Write your password" />
                </FormGroup>
                <LoaderButton
                    block
                    bsSize="large"
                    type="submit"
                    isLoading={this.state.isLoading}
                    text="Login using OpenID"
                    loadingText="Logging in…"
                />
            </Form>
        );
    }
}