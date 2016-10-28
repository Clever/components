import React from "react";
import classnames from "classnames";

import {Button} from "../Button/Button";

import "./NavLink.less";

export function NavLink(props) {
  const {cssClass} = NavLink;
  const selected = props.selected ? cssClass.SELECTED : null;
  return (
    <a className={classnames(cssClass.CONTAINER, selected)} href={props.href} onClick={props.onClick}>
      <span className={classnames(cssClass.ICON, props.icon)} />
      {props.label}
    </a>
  );
}

NavLink.cssClass = {
  CONTAINER: "NavLink",
  SELECTED: "NavLink--selected",
  ICON: "NavLink--icon",
};
