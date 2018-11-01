import * as React from "react";
import classNames from "classnames";

import "./RoleButton.scss";

const RoleButton = props => {
  const { toggle, isPatient } = props;

  return (
    <div className="RoleButton__container">
      <div
        className={classNames("RoleButton__option", {
          RoleButton__selected: isPatient
        })}
        onClick={() => toggle(true)}
      >
        <span>Patient</span>
      </div>
      <div
        className={classNames("RoleButton__option", {
          RoleButton__selected: !isPatient
        })}
        onClick={() => toggle(false)}
      >
        <span>Doctor</span>
      </div>
    </div>
  );
};

export default RoleButton;
