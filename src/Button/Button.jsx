import React from "react";

require("./Button.less");

export class Button extends React.Component {
  constructor(props) {
    super(props);
    if (props.type === "destructive" && props.size === "small") {
      throw new Error("Small destructive buttons are not supported");
    }
  }
  render() {
    let classes = "Button ";
    classes += `Button--${this.props.type} `;
    classes += `Button--${this.props.size} `;
    if (this.props.href == null || this.props.disabled) {
      // use <button>s for all disabled links and things with no href prop (buttons)
      return (
        <button className={classes} onClick={this.props.onClick} disabled={this.props.disabled}>
          {this.props.value}
        </button>
      );
    }
    return (
      <a className={classes} target={this.props.target} href={this.props.href}>
        {this.props.value}
      </a>
    );
  }
}

Button.defaultProps = {
  type: "secondary",
  size: "regular",
  target: "_blank",
};

Button.propTypes = {
  type: React.PropTypes.oneOf(["primary", "secondary", "destructive"]),
  size: React.PropTypes.oneOf(["large", "regular", "small"]),
  value: React.PropTypes.string.isRequired,
  href: React.PropTypes.string,
  target: React.PropTypes.oneOf(["_self", "_blank"]),
  disabled: React.PropTypes.bool,
  onClick: React.PropTypes.func,
};
