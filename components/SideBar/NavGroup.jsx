import classnames from "classnames";
import React, {PropTypes} from "react";

import MorePropTypes from "utils/MorePropTypes";
import NavLink from "./NavLink";
import {FlexBox} from "../../../src";

import "./NavGroup.less";


export default function NavGroup({children, className, title}) {
  const {cssClass} = NavGroup;

  return (
    <FlexBox className={classnames(cssClass.CONTAINER, className)} column>
      <h3 className={cssClass.TITLE}>{title}</h3>
      <FlexBox className={cssClass.SUB_NAV} column>
        {children}
      </FlexBox>
    </FlexBox>
  );
}

NavGroup.propTypes = {
  children: MorePropTypes.oneOrManyOf(NavLink).isRequired,
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
};

NavGroup.cssClass = {
  CONTAINER: "SideBar--NavGroup",
  SUB_NAV: "SideBar--NavGroup--subNav",
  TITLE: "SideBar--NavGroup--title",
};
