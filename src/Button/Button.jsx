import React from "react";

require('./Button.less');

const VALID_TYPES = ["primary", "secondary", "destructive"];
const VALID_SIZES = ["large", "regular", "small", "regular"];

export class Button extends React.Component {
  constructor(props) {
    super()
    if (props.type && VALID_TYPES.indexOf(props.type) === -1) {
      throw new Error(`Invalid type property. Got ${props.type}, expected one of ${VALID_TYPES}`);
    }
    if (props.size && VALID_SIZES.indexOf(props.size) === -1) {
      throw new Error(`Invalid size property. Got ${props.size}, expected one of ${VALID_SIZES}`);
    }
    if (props.type === "destructive" && props.size === "small"){
      throw new Error("Small destructive buttons are not supported");
    }
  }
  render() {
    let classes = "Button ";
    classes += `Button--${this.props.type} `;
    let size = ["large", "regular", "small"].indexOf(this.props.size) > -1 ? this.props.size : "regular"
    classes += `Button--${size} `;
    if (this.props.href == null && !this.props.disabled) {
      // use <button>s for all disabled buttons and things with no href prop
      return (
        <button className={classes} onClick={this.props.onClick} disabled={this.props.disabled || false}>
          {this.props.value}
        </button>
      );
    } else {
      const target = this.props.target != null ? this.props.target : "_blank";
      const onClick = this.props.disabled ? function(e){ e.preventDefault(); } : null;
      return (
        <a className={classes} target={target} href={this.props.href} disabled={this.props.disabled || false} onClick={onClick}>
          {this.props.value}
        </a>
      );
    }
  }
}
