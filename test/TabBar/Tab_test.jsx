import assert from "assert";
import React from "react";
import sinon from "sinon";
import {shallow} from "enzyme";

import Tab from "../../src/TabBar/Tab";


describe("FlexBox", () => {
  const {cssClass} = Tab;

  const TAB_LABEL = <span>Test Tab Label</span>;
  const TAB_VALUE = 1;

  const renderTab = (props = {}) => shallow(<Tab id={TAB_VALUE} {...props}>{TAB_LABEL}</Tab>);

  it("renders as <button> by default", () => {
    const tab = renderTab();
    assert.equal(tab.type(), "button", "Should be rendered as <button>.");
  });

  it("renders as <a> if href is specified", () => {
    const tab = renderTab({href: "url/path"});
    assert.equal(tab.type(), "a", "Should be rendered as <a>.");
    assert.equal(tab.props().href, "url/path");
  });

  it("applies custom classname", () => {
    const tab = renderTab({className: "custom"});
    assert(tab.hasClass("custom"), "Custom class name should be applied.");
  });

  it("applies appropriate classname if disabled", () => {
    const tab = renderTab({disabled: true});
    assert(tab.hasClass(cssClass.DISABLED), "flex--grow class name should be applied.");
  });

  it("applies appropriate classname if selected", () => {
    const tab = renderTab({selected: true});
    assert(tab.hasClass(cssClass.SELECTED), "self--end class name should be applied.");
  });

  it("invokes `onSelect` handler on click", () => {
    const onSelect = sinon.spy();
    const mockEvent = {preventDefault: sinon.spy()};

    const tab = renderTab({onSelect});
    tab.simulate("click", mockEvent);

    sinon.assert.calledWith(onSelect, TAB_VALUE);
    sinon.assert.notCalled(mockEvent.preventDefault);
  });

  it("doesn't invoke `onSelect` handler if disabled", () => {
    const onSelect = sinon.spy();
    const mockEvent = {preventDefault: sinon.spy()};

    const tab = renderTab({disabled: true, onSelect});
    tab.simulate("click", mockEvent);

    sinon.assert.notCalled(onSelect);
    sinon.assert.called(mockEvent.preventDefault);
  });

  it("renders label", () => {
    const tab = renderTab();
    assert(tab.contains(TAB_LABEL), "Label not rendered.");
  });
});
