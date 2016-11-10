import React from "react";
import classnames from "classnames";

import {NavLink} from "./NavLink";

// NavGroup doesn't render its children because the LeftNav will render them in
// a drawer if the NavGroup is open.
export function NavGroup(props) {
  const {cssClass} = NavGroup;

  const open = props.open ? cssClass.OPEN : null;
  return (
    <NavLink
      className={classnames(cssClass.CONTAINER, open)}
      label={props.label}
      icon={props.icon}
      onClick={props.onClick}
    />
  );
}

NavGroup.cssClass = {
  CONTAINER: "NavGroup",
  OPEN: "NavGroup--open",
};
