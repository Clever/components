import React from "react";
import classnames from "classnames";

import {NavLink} from "./NavLink";

import "./NavGroup.less";

export function NavGroup(props) {
  const {cssClass} = NavGroup;
  return (
    <div className={classnames(cssClass.CONTAINER, props.className)}>
      <NavLink label={props.label} icon={props.icon} onClick={props.onClick} />
      <div className={cssClass.SUBNAV}>
        {props.children}
      </div>
    </div>
  );
}

NavGroup.cssClass = {
  CONTAINER: "NavGroup",
  SUBNAV: "NavGroup--subnav",
};
