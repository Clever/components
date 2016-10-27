import React from "react";
import classnames from "classnames";

import {Button} from "../Button/Button";

import "./NavLink.less";

export function NavLink(props) {
  const {cssClass} = NavLink;
  return (
    <a className={cssClass.CONTAINER} href={props.href}>
      <span className={classnames(cssClass.ICON, props.icon)} />
      {props.label}
    </a>
  );
}

NavLink.cssClass = {
  CONTAINER: "NavLink",
  ICON: "NavLink--icon",
};
