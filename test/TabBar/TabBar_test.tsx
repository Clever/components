import * as assert from "assert";
import * as React from "react";
import { shallow } from "enzyme";

import FlexBox from "../../src/flex/FlexBox";
import Tab from "../../src/TabBar/Tab";
import TabBar, { cssClass } from "../../src/TabBar/TabBar";

describe("FlexBox", () => {
  const TABS = [
    <Tab id="id_1" key="key_1" value={1}>
      Tab 1
    </Tab>,
    <Tab id="id_2" key="key_2" value={2}>
      Tab 2
    </Tab>,
  ];

  const renderTabBar = (props = {}) => shallow(<TabBar {...props}>{TABS}</TabBar>);

  it("renders as FlexBox", () => {
    const tabBar = renderTabBar();
    assert.equal(tabBar.type(), FlexBox, "Should be rendered as FlexBox.");
  });

  it("applies custom classname", () => {
    const tabBar = renderTabBar({ className: "custom" });
    assert(tabBar.hasClass("custom"), "Custom class name should be applied.");
  });

  it("applies appropriate size class", () => {
    const tabBar = renderTabBar({ size: TabBar.Size.LARGE });

    const expectedClass = cssClass.size(TabBar.Size.LARGE);
    assert(
      tabBar.hasClass(expectedClass),
      `Expected to find ${expectedClass} class in ${tabBar.props().className}`,
    );
  });

  it("renders child tabs", () => {
    const tabBar = renderTabBar();
    assert(tabBar.contains(TABS), "Child tabs not rendered.");
  });
});
