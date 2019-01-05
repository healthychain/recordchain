import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Box from "../UI/Containers";
import "./RegisterSuccessForm.scss";
import { Redirect } from "react-router-dom";

class RegisterSuccessForm extends Component {
  render() {
    console.log(this.props);
    return (
      <div className="Form__Container">
        <div className="Flex__Column">
          <div
            className="Flex__Blue Flex__Centered Flex__Double"
            style={{ padding: "5px 38px" }}
          >
            <h1 className="Page__Title">{`Registration successful`}</h1>
          </div>
          <div className="Flex__Column Flex__Centered Flex__Double">
            <Box fullwidth>
              <div className="RegisterSuccess__insidebox">
                <img src="http://icons.iconarchive.com/icons/jonathan-rey/simpsons/256/Homer-Simpson-04-Happy-icon.png" />
                <div className="separator" />
                <div className="RegisterSuccess__info">
                  <p className="RegisterSuccess__info">
                    Waiting for the approval from the authority. You should be
                    contacted soon regarding the registration status. You can
                    now navigate to
                  </p>
                  <Link to="/welcome">
                    <p className="RegisterSuccess__info RegisterSuccess__info__clickable">
                      {"  "}
                      Home Page
                    </p>
                  </Link>
                </div>
              </div>
            </Box>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(RegisterSuccessForm);
