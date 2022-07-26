import React from "react";
import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {

  //sets class for buttons, danger for cancel, confirm for confirm
  let buttonClass = classNames("button", {
    " button--confirm" : props.confirm,
    " button--danger" : props.danger
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
