import React, {PropTypes} from "react";

import SideBar from "./SideBar";
import TopBar from "./TopBar";
import {FlexBox, FlexItem} from "src";

import "./Layout.less";


/**
 * Global layout for the Design System docs.
 */
export default function Layout({children}) {
  const {cssClass} = Layout;

  return (
    <FlexBox className={cssClass.LAYOUT} column grow>
      <TopBar />
      <FlexBox className={cssClass.MAIN} grow>
        <SideBar />
        <FlexItem className={cssClass.VIEW_CONTAINER} grow>
          {children}
        </FlexItem>
      </FlexBox>
    </FlexBox>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

Layout.cssClass = {
  LAYOUT: "Layout",
  LEGACY_CONTAINER: "layout-container",
  MAIN: "Layout--mainContainer",
  VIEW_CONTAINER: "Layout--viewContainer",
};
