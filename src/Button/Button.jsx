import React from "react";

require("./Button.less");

export function Button(props) {
  if (props.type === "destructive" && props.size === "small") {
    throw new Error("Small destructive buttons are not supported");
  }

  if (props.href && props.submit) {
    throw new Error("Buttons with href do not support the submit option");
  }

  let classes = `Button Button--${props.type} Button--${props.size}`;
  if (props.className) {
    classes += ` ${props.className}`;
  }
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
  type: "secondary",
  size: "regular",
  target: "_blank",
};

Button.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.oneOf(["primary", "secondary", "destructive", "link", "linkPlain"]),
  size: React.PropTypes.oneOf(["large", "regular", "small"]),
  value: React.PropTypes.string.isRequired,
  href: React.PropTypes.string,
  target: React.PropTypes.oneOf(["_self", "_blank"]),
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  submit: React.PropTypes.bool,
  style: React.PropTypes.object,
};
