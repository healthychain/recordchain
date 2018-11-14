import * as React from "react";

import spinner from "../../assets/spinner.svg";

import "./LoadingScreen.scss";

export const LoadingScreen = () => (
  <div className="LoadingScreen__container">
    <img src={spinner} />
  </div>
);

export default LoadingScreen;
