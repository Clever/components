import React from "react";

require('./Button.less');

class Button extends React.Component {
  render() {
    var classes = "Button ";
    if (["primary", "secondary", "destructive"].indexOf(this.props.type) > -1) {
      classes += `Button--${this.props.type} `;
    }
    if (["large", "regular", "small"].indexOf(this.props.size) > -1) {
      classes += `Button--${this.props.size} `;
    } else {
      classes += `Button--regular `;
    }
    if (this.props.href == null && !this.props.disabled) {
      // use <button>s for all disabled buttons and things with no href prop
      return (
        <button className={classes} onClick={this.props.onClick} disabled={this.props.disabled || false}>
          {this.props.value}
        </button>
      );
    } else {
      const target = this.props.target != null ? this.props.target : "_blank";
      return (
        <a className={classes} target={target} href={this.props.href} disabled={this.props.disabled || false}>
          {this.props.value}
        </a>
      );
    }
  }
}

export default Button;
