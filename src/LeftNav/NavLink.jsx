import React from "react";
import classnames from "classnames";

import {Button, FlexBox, FlexItem, ItemAlign} from "../";

export function NavLink(props) {
  const {cssClass} = NavLink;
  const selected = props.selected ? cssClass.SELECTED : null;
  return (
    <FlexBox
      component="li"
      className={classnames(cssClass.CONTAINER, props.className, selected)}
      onClick={props.onClick}
      alignItems={ItemAlign.CENTER}
    >
      <FlexItem className={cssClass.ICON}>{props.icon}</FlexItem>
      <FlexItem className={cssClass.LABEL} data-text={props.label}>{props.label}</FlexItem>
    </FlexBox>
  );
}

NavLink.cssClass = {
  CONTAINER: "NavLink",
  LABEL: "NavLink--label",
  ICON: "NavLink--icon",
  SELECTED: "NavLink--selected",
};
