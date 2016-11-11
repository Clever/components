import React, {PropTypes} from "react";
import classnames from "classnames";

import {NavLink} from "./NavLink";

// NavGroup doesn't render its children because LeftNav will render them in
// a drawer if the NavGroup is open.
export function NavGroup(props) {
  const {cssClass} = NavGroup;

  const open = props.open ? cssClass.OPEN : null;
  return (
    <NavLink
      className={classnames(cssClass.CONTAINER, open)}
      label={props.label}
      icon={props.icon}
      onClick={props._onClick}
    />
  );
}

NavGroup.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  open: PropTypes.bool,
  _onClick: PropTypes.func, // private - used by LeftNav only
};

NavGroup.cssClass = {
  CONTAINER: "NavGroup",
  OPEN: "NavGroup--open",
};
