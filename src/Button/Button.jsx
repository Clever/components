import _ from "lodash";
import classnames from "classnames";
import React from "react";

import "./Button.less";


export class Button extends React.PureComponent {
  _buttonRef;

  focus() {
    if (this._buttonRef) {
      this._buttonRef.focus();
    }
  }

  blur() {
    if (this._buttonRef) {
      this._buttonRef.blur();
    }
  }

  render() {
    const {Size, Type} = Button;
    const {
      className,
      disabled,
      href,
      onClick,
      size,
      style,
      submit,
      target,
      type,
      value,
    } = this.props;

    if (type === Type.DESTRUCTIVE && size === Size.S) {
      throw new Error("Small destructive buttons are not supported");
    }

    if (href && submit) {
      throw new Error("Buttons with href do not support the submit option");
    }

    const classes = classnames(
      `Button Button--${type}`,
      `Button--${size}`,
      className
    );

    if (href == null || disabled) {
      // use <button>s for all disabled links and things with no href prop (buttons)
      return (
        <button
          className={classes}
          disabled={disabled}
          onClick={onClick}
          ref={ref => { this._buttonRef = ref; }}
          style={style}
          type={submit ? "submit" : "button"}
          aria-label={(typeof value === "string") ? value : null}
        >
          {value}
        </button>
      );
    }
    return (
      <a
        className={classes}
        href={href}
        onClick={onClick}
        ref={ref => { this._buttonRef = ref; }}
        style={style}
        target={target}
        aria-label={(typeof value === "string") ? value : null}
      >
        {value}
      </a>
    );
  }
}

Button.Size = {
  S: "small",
  M: "regular",
  L: "large",
};

Button.Type = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  DESTRUCTIVE: "destructive",
  LINK: "link",
  LINK_PLAIN: "linkPlain",
  PLAIN: "plain",
};

Button.defaultProps = {
  type: Button.Type.SECONDARY,
  size: Button.Size.M,
  target: "_blank",
};

Button.propTypes = {
  className: React.PropTypes.string,
  type: React.PropTypes.oneOf(_.values(Button.Type)),
  size: React.PropTypes.oneOf(_.values(Button.Size)),
  value: React.PropTypes.node.isRequired,
  href: React.PropTypes.string,
  target: React.PropTypes.oneOf(["_self", "_blank"]),
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  submit: React.PropTypes.bool,
  style: React.PropTypes.object,
};
