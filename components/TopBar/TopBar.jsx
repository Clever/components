import classnames from "classnames";
import React, {PropTypes} from "react";

import {FlexBox, FlexItem, ItemAlign} from "../../../src";
import Logo from "./Logo";
import SideBarToggle from "./SideBarToggle";

import "./TopBar.less";


export default function TopBar({className, onToggleMenu}) {
  const {cssClass} = TopBar;

  return (
    <FlexBox alignItems={ItemAlign.CENTER} className={classnames(cssClass.CONTAINER, className)}>
      <SideBarToggle onClick={onToggleMenu} />
      <FlexBox
        alignItems={ItemAlign.CENTER}
        className={cssClass.HOME_LINK}
        component="a"
        href="//clever.com"
        target="_blank"
      >
        <Logo className={cssClass.LOGO} />
      </FlexBox>
      <h1 className={cssClass.TITLE}>Design System</h1>
      <FlexItem className={cssClass.GITHUB_LINK_CONTAINER} grow>
        <a className={cssClass.GITHUB_LINK} href="//github.com/clever/components" target="_blank">
          <span className={"fa fa-github"} />
        </a>
      </FlexItem>
    </FlexBox>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onToggleMenu: PropTypes.func.isRequired,
};

TopBar.cssClass = {
  CONTAINER: "TopBar",
  GITHUB_LINK: "TopBar--githubLink",
  GITHUB_LINK_CONTAINER: "TopBar--githubLinkContainer",
  HOME_LINK: "TopBar--homeLink",
  LOGO: "TopBar--logo",
  TITLE: "TopBar--title",
  SUBTITLE: "TopBar--subtitle",
};
