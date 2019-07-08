import * as React from "react";
import * as PropTypes from "prop-types";

export interface Props {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  href?: string;
  onClick?: Function;
  target?: "_self" | "_blank";
}

const propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func,
  target: PropTypes.oneOf(["_self", "_blank"]),
};

export default class Option extends React.PureComponent<Props> {
  static propTypes = propTypes;
  render() {
    throw new Error("Configuration component only. Cannot be rendered outside of DropdownButton.");
  }
}
