import React from "react";

import {FlexBox} from "../flex/";
import {NavLink} from "./NavLink";
import {NavGroup} from "./NavGroup";
import {CollapsibleNavGroup} from "./CollapsibleNavGroup";
import {DrawerNavGroup} from "./DrawerNavGroup";

import "./LeftNav.less";

export function LeftNav(props) {
  const {cssClass} = LeftNav;
  return (
    <FlexBox component="nav" column className={cssClass.CONTAINER}>
      {props.children}
    </FlexBox>
  );
}

LeftNav.NavLink = NavLink;
LeftNav.NavGroup = NavGroup;
LeftNav.CollapsibleNavGroup = CollapsibleNavGroup;
LeftNav.DrawerNavGroup = DrawerNavGroup;

LeftNav.propTypes = {
  // List required and optional proptypes
};

LeftNav.cssClass = {
  CONTAINER: "LeftNav",
};
