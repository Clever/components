import classnames from "classnames";
import React from "react";
import * as PropTypes from "prop-types";

import { FlexItem, Logo } from "src";
import Colors from "src/utils/Colors";
import BaseTopBar, { TopBarButton } from "src/TopBar";

import "./TopBar.less";

export default function TopBar({ className, onToggleMenu }) {
  const { cssClass } = TopBar;

  return (
    <BaseTopBar
      className={classnames(cssClass.CONTAINER, className)}
      logo={<Logo className={cssClass.LOGO} color={Colors.PRIMARY_BLUE} />}
      logoLinkHref="//clever.com"
      logoLinkTarget="_blank"
      onToggleMenu={onToggleMenu}
      showHeart
      showMenuToggle
      title="Design System"
    >
      <FlexItem grow />
      <TopBarButton
        className={cssClass.GITHUB_LINK}
        href="//github.com/clever/components"
        target="_blank"
      >
        <span className="fa fa-github" />
      </TopBarButton>
    </BaseTopBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onToggleMenu: PropTypes.func.isRequired,
};

TopBar.cssClass = {
  CONTAINER: "docs--TopBar",
  GITHUB_LINK: "docs--TopBar--githubLink",
  GITHUB_LINK_CONTAINER: "docs--TopBar--githubLinkContainer",
  HOME_LINK: "docs--TopBar--homeLink",
  LOGO: "docs--TopBar--logo",
  TITLE: "docs--TopBar--title",
  SUBTITLE: "docs--TopBar--subtitle",
};
