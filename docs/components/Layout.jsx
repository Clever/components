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
  myRef = React.createRef();

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const view_container = this.myRef.current;

    if (view_container && location.pathname !== prevProps.location.pathname) {
      view_container.scrollTo(0, 0);
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
          <div className={cssClass.VIEW_CONTAINER} ref={this.myRef}>
            {children}
          </div>
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
