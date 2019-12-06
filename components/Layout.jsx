import React from "react";
import * as PropTypes from "prop-types";

import SideBar from "./SideBar";
import TopBar from "./TopBar";
import { FlexBox, FlexItem } from "src";

import "./Layout.less";

/**
 * Global layout for the Design System docs.
 */
export default class Layout extends React.PureComponent {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { cssClass } = Layout;

    if (location.pathname !== prevProps.location.pathname) {
      document.getElementsByClassName(cssClass.VIEW_CONTAINER)[0].scrollTo(0, 0);
    }
  }

  render() {
    const { cssClass } = Layout;
    const { children } = this.props;

    return (
      <FlexBox className={cssClass.LAYOUT} column grow>
        <TopBar />
        <FlexBox className={cssClass.MAIN} grow>
          <SideBar className={cssClass.SIDE_BAR} />
          <FlexItem className={cssClass.VIEW_CONTAINER} grow>
            {children}
          </FlexItem>
        </FlexBox>
      </FlexBox>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

Layout.cssClass = {
  LAYOUT: "Layout",
  LEGACY_CONTAINER: "layout-container",
  MAIN: "Layout--mainContainer",
  SIDE_BAR: "Layout--sideBar",
  VIEW_CONTAINER: "Layout--viewContainer",
};
