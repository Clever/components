import * as React from "react";
import classnames from "classnames";

import {NavLink} from "./NavLink";

const CLASSNAMES = {
  CONTAINER: "NavGroup",
  OPEN: "NavGroup--open",
};

// NavGroup doesn't render its children because LeftNav will render them in
// a drawer if the NavGroup is open.
export function NavGroup(props) {
  const open = props._open ? CLASSNAMES.OPEN : null;
  return (
    <NavLink
      className={classnames(CLASSNAMES.CONTAINER, props.className, open)}
      label={props.label}
      icon={props.icon}
      onClick={props._onClick}
    />
  );
}

NavGroup.propTypes = {
  className:  React.PropTypes.string,
  id:  React.PropTypes.string.isRequired,
  icon:  React.PropTypes.node.isRequired,
  label:  React.PropTypes.string.isRequired,
  _open:  React.PropTypes.bool, // private - used by LeftNav only
  _onClick:  React.PropTypes.func, // private - used by LeftNav only
};
