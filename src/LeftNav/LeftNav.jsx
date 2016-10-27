import React from "react";

import {FlexBox} from "../flex/";
import {NavLink} from "./NavLink";
import {NavGroup} from "./NavGroup";

require("./LeftNav.less");

export function LeftNav(props) {
  return (
    <FlexBox>
      <nav>
        <ul>
          {props.children}
        </ul>
      </nav>
    </FlexBox>
  );
}

LeftNav.NavLink = NavLink;
LeftNav.NavGroup = NavGroup;

LeftNav.propTypes = {
  // List required and optional proptypes
};

LeftNav.cssClass = {
};
