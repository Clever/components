import assert from "assert";
import React from "react";
import { shallow } from "enzyme";

import FlexItem from "../../src/flex/FlexItem";
import ItemAlign from "../../src/flex/ItemAlign";

describe("FlexBox", () => {
  it("applies custom classname", () => {
    const flexItem = shallow(<FlexItem className="custom" />);
    assert(flexItem.hasClass("custom"), "Custom class name should be applied.");
  });

  it("applies flex--grow classname", () => {
    const flexItem = shallow(<FlexItem grow />);
    assert(flexItem.hasClass("flex--grow"), "flex--grow class name should be applied.");
  });

  it("applies self-alignment classname", () => {
    const flexItem = shallow(<FlexItem alignSelf={ItemAlign.END} />);
    assert(flexItem.hasClass("self--end"), "self--end class name should be applied.");
  });

  it("uses custom wrapper component", () => {
    const flexItem = shallow(<FlexItem component="ul" />);
    assert.equal(flexItem.type(), "ul", "Incorrect wrapper component type.");
  });

  it("renders child items", () => {
    const items = [<div key="0" />, <span key="1" />];

    const flexItem = shallow(<FlexItem>{items}</FlexItem>);

    assert(flexItem.containsAllMatchingElements(items), "child items not rendered");
  });
});
