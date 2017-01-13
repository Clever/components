import React, {PropTypes} from "react";
import classnames from "classnames";

import {NavLink} from "./NavLink";

// NavGroup doesn't render its children because LeftNav will render them in
// a drawer if the NavGroup is open.
export function NavGroup(props) {
  const {cssClass} = NavGroup;

  const open = props._open ? cssClass.OPEN : null;
  return (
    <NavLink
      className={classnames(cssClass.CONTAINER, props.className, open)}
      label={props.label}
      icon={props.icon}
      onClick={props._onClick}
    />
  );
}

NavGroup.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  _open: PropTypes.bool, // private - used by LeftNav only
  _onClick: PropTypes.func, // private - used by LeftNav only
};

NavGroup.cssClass = {
  CONTAINER: "NavGroup",
  OPEN: "NavGroup--open",
};
