import * as assert from "assert";
import * as React from "react";
import { shallow } from "enzyme";

import ContentAlign from "../../src/flex/ContentAlign";
import Justify from "../../src/flex/Justify";
import FlexBox from "../../src/flex/FlexBox";
import FlexItem from "../../src/flex/FlexItem";
import ItemAlign from "../../src/flex/ItemAlign";

describe("FlexBox", () => {
  it("applies flexbox classname", () => {
    const flexBox = shallow(<FlexBox />);
    assert(flexBox.hasClass("flexbox"), "flexbox class should be applied.");
  });

  it("applies flexbox--inline classname if 'inline' prop is specified", () => {
    const flexBox = shallow(<FlexBox inline />);
    assert(!flexBox.hasClass("flexbox"), "flexbox class name should not be applied.");
    assert(flexBox.hasClass("flexbox--inline"), "flexbox class name should be applied.");
  });

  it("applies custom classname", () => {
    const flexBox = shallow(<FlexBox className="custom" />);
    assert(flexBox.hasClass("custom"), "Custom class name not applied.");
  });

  it("applies flex--direction--column classname if applicable", () => {
    const flexBox = shallow(<FlexBox column />);
    assert(
      flexBox.hasClass("flex--direction--column"),
      "flex--direction--column class name should be applied.",
    );
  });

  it("applies content alignment classnames", () => {
    const flexBox = shallow(<FlexBox alignContent={ContentAlign.END} />);
    assert(flexBox.hasClass("content--end"), "content--end class name should be applied.");
  });

  it("applies item alignment classnames", () => {
    const flexBox = shallow(<FlexBox alignItems={ItemAlign.START} />);
    assert(flexBox.hasClass("items--start"), "items--start class name should be applied.");
  });

  it("applies content justify classnames", () => {
    const flexBox = shallow(<FlexBox justify={Justify.CENTER} />);
    assert(flexBox.hasClass("justify--center"), "justify--center class name should be applied.");
  });

  it("passes through additional props to FlexItem", () => {
    const flexBox = shallow(<FlexBox component="ul" />);

    assert.equal(flexBox.type(), FlexItem);
    assert.equal(flexBox.props().component, "ul");
  });

  it("renders child items", () => {
    const items = [<div key="0" />, <span key="1" />];

    const flexBox = shallow(<FlexBox>{items}</FlexBox>);

    assert(flexBox.containsAllMatchingElements(items), "child items not rendered");
  });
});
