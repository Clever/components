import React from "react";

require("./Button.less");

export function Button(props) {
  if (props.type === "destructive" && props.size === "small") {
    throw new Error("Small destructive buttons are not supported");
  }

  let classes = "Button ";
  classes += `Button--${props.type} `;
  classes += `Button--${props.size} `;
  if (props.href == null || props.disabled) {
    // use <button>s for all disabled links and things with no href prop (buttons)
    return (
      <button type="button" className={classes} onClick={props.onClick} disabled={props.disabled}>
        {props.value}
      </button>
    );
  }
  return (
    <a className={classes} target={props.target} href={props.href}>
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
  type: React.PropTypes.oneOf(["primary", "secondary", "destructive", "link"]),
  size: React.PropTypes.oneOf(["large", "regular", "small"]),
  value: React.PropTypes.string.isRequired,
  href: React.PropTypes.string,
  target: React.PropTypes.oneOf(["_self", "_blank"]),
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};
