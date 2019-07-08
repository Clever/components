import { PureComponent } from "react";
import * as PropTypes from "prop-types";

export default class Option extends PureComponent {
  render() {
    throw new Error("Configuration component only. Cannot be rendered outside of DropdownButton.");
  }
}

Option.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  target: PropTypes.oneOf(["_self", "_blank"]),
};
