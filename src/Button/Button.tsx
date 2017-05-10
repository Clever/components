import _ from "lodash";
import classnames from "classnames";
import * as React from "react";

import "./Button.less";


export const SIZES = {
  S: "small",
  M: "regular",
  L: "large",
};

export const TYPES = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  DESTRUCTIVE: "destructive",
  LINK: "link",
  LINK_PLAIN: "linkPlain",
  PLAIN: "plain",
};

export function Button(props) {
  if (props.type === TYPES.DESTRUCTIVE && props.size === SIZES.S) {
    throw new Error("Small destructive buttons are not supported");
  }

  if (props.href && props.submit) {
    throw new Error("Buttons with href do not support the submit option");
  }

  const classes = classnames(
    `Button Button--${props.type}`,
    `Button--${props.size}`,
    props.className
  );
  const type = props.submit ? "submit" : "button";

  if (props.href == null || props.disabled) {
    // use <button>s for all disabled links and things with no href prop (buttons)
    return (
      <button type={type} className={classes} onClick={props.onClick} disabled={props.disabled} style={props.style}>
        {props.value}
      </button>
    );
  }
  return (
    <a className={classes} target={props.target} href={props.href} onClick={props.onClick} style={props.style}>
      {props.value}
    </a>
  );
}

Button.defaultProps = {
  type: TYPES.SECONDARY,
  size: SIZES.M,
  target: "_blank",
};

Button.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.oneOf(_.values(TYPES)),
  size: React.PropTypes.oneOf(_.values(SIZES)),
  value: React.PropTypes.node.isRequired,
  href: React.PropTypes.string,
  target: React.PropTypes.oneOf(["_self", "_blank"]),
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  submit: React.PropTypes.bool,
  style: React.PropTypes.object,
};
