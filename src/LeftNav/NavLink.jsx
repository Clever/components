import React from "react";
import classnames from "classnames";

import {Button} from "../Button/Button";

import "./NavLink.less";

export function NavLink(props) {
  const {cssClass} = NavLink;
  return (
    <a className={cssClass.CONTAINER} onClick={props.onClick}>
      <span className={classnames(cssClass.ICON, props.icon)} />
      <span className={cssClass.LABEL}>{props.label}</span>
    </a>
  );
}

NavLink.cssClass = {
  CONTAINER: "NavLink",
  LABEL: "NavLink--label",
  ICON: "NavLink--icon",
};
