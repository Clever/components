import React from "react";

import {FlexBox} from "../flex/";
import {NavLink} from "./NavLink";
import {NavGroup} from "./NavGroup";
import {CollapsibleNavGroup} from "./CollapsibleNavGroup";

import "./LeftNav.less";

export function LeftNav(props) {
  const {cssClass} = LeftNav;
  return (
    <FlexBox className={cssClass.CONTAINER}>
      <nav>
        {props.children}
      </nav>
    </FlexBox>
  );
}

LeftNav.NavLink = NavLink;
LeftNav.NavGroup = NavGroup;
LeftNav.CollapsibleNavGroup = CollapsibleNavGroup;

LeftNav.propTypes = {
  // List required and optional proptypes
};

LeftNav.cssClass = {
  CONTAINER: "LeftNav",
};
