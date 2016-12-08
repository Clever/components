import * as React from "react";
const {PropTypes} = React;
import classnames from "classnames";

import {NavLink} from "./NavLink";

// NavGroup doesn't render its children because LeftNav will render them in
// a drawer if the NavGroup is open.
export function NavGroup(props) {
  const {cssClass} = NavGroup;

  const open = props._open ? cssClass.OPEN : null;
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
  _open: PropTypes.bool, // private - used by LeftNav only
  _onClick: PropTypes.func, // private - used by LeftNav only
  visible: PropTypes.bool,
};

NavGroup.cssClass = {
  CONTAINER: "NavGroup",
  OPEN: "NavGroup--open",
};

NavGroup.defaultProps = {
  visible: true,
};
