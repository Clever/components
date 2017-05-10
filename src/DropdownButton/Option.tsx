import * as React from "react";


export default class Option extends React.PureComponent {
  render() {
    throw new Error("Configuration component only. Cannot be rendered outside of DropdownButton.");
  }
}

Option.propTypes = {
  children:  React.PropTypes.node.isRequired,
  className:  React.PropTypes.string,
  disabled:  React.PropTypes.bool,
  href:  React.PropTypes.string,
  onClick:  React.PropTypes.func,
  target:  React.PropTypes.oneOf(["_self", "_blank"]),
};
