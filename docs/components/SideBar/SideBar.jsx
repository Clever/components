import classnames from "classnames";
import React, {PropTypes} from "react";

import NavGroup from "./NavGroup";
import NavLink from "./NavLink";
import {FlexBox} from "../../../src";

import "./SideBar.less";


export default function SideBar({className}) {
  const {cssClass} = SideBar;

  return (
    <FlexBox className={classnames(cssClass.CONTAINER, className)} column>
      <NavLink href="/intro">Introduction</NavLink>
      <NavLink href="/getting-started">Getting Started</NavLink>
      <NavGroup title="Design">
        <NavLink href="/design/colors">Colors</NavLink>
        <NavLink href="/design/typography">Typography</NavLink>
        <NavLink href="/design/sizing">Sizing</NavLink>
        <NavLink href="/design/page-layout">Page Layout</NavLink>
        <NavLink href="/design/ui-text">UI Text</NavLink>
      </NavGroup>
      <NavGroup title="Components">
        <NavLink href="/components/button">Button</NavLink>
        <NavLink href="/components/confirmation-button">ConfirmationButton</NavLink>
        <NavLink href="/components/copyable-input">CopyableInput</NavLink>
        <NavLink href="/components/flex-box">FlexBox</NavLink>
        <NavLink href="/components/grid">Grid</NavLink>
        <NavLink href="/components/icon">Icon</NavLink>
        <NavLink href="/components/left-nav">LeftNav</NavLink>
        <NavLink href="/components/modal">Modal</NavLink>
        <NavLink href="/components/modal-button">ModalButton</NavLink>
        <NavLink href="/components/progress-bar">ProgressBar</NavLink>
        <NavLink href="/components/segmented-control">SegmentedControl</NavLink>
        <NavLink href="/components/select">Select</NavLink>
        <NavLink href="/components/tab-bar">TabBar</NavLink>
        <NavLink href="/components/table">Table</NavLink>
        <NavLink href="/components/text-area">TextArea</NavLink>
        <NavLink href="/components/text-input">TextInput</NavLink>
        <NavLink href="/components/wizard">Wizard</NavLink>
      </NavGroup>
      <NavGroup title="LESS">
        <NavLink href="/less/less-style-guide">Style Guide</NavLink>
        <NavLink href="/less/spacing">Spacing</NavLink>
      </NavGroup>
    </FlexBox>
  );
}

SideBar.propTypes = {
  className: PropTypes.string,
};

SideBar.cssClass = {
  CONTAINER: "SideBar",
};
