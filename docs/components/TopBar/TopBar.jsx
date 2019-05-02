import classnames from "classnames";
import React from "react";
import * as PropTypes from "prop-types";

import { FlexItem } from "src";
import { TopBar as BaseTopBar } from "src/TopBar";

import "./TopBar.less";

export default function TopBar({ className }) {
  const { cssClass } = TopBar;

  return (
    <BaseTopBar
      className={classnames(cssClass.CONTAINER, className)}
      logoHref="//clever.com"
      title="Design System"
    >
      <FlexItem grow />
      <BaseTopBar.Button
        className={cssClass.GITHUB_LINK}
        href="//github.com/clever/components"
        target="_blank"
      >
        <span className="fa fa-github" />
      </BaseTopBar.Button>
    </BaseTopBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
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
