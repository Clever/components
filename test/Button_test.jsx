/* eslint func-names: "off" */

import assert from "assert";
import React from "react";
import sinon from "sinon";
import {shallow} from "enzyme";
import {Button} from "../src";

describe("Button", () => {
  const sizes = ["small", "regular", "large"];
  const types = ["primary", "secondary", "destructive", "link"];

  sizes.forEach((size) => {
    types.forEach((type) => {
      if (size === "small" && type === "destructive") return;

      it(`renders a ${size}, ${type} button with the correct classes`, () => {
        const button = shallow(<Button size={size} type={type} value="A button" />);
        assert(button.hasClass("Button"));
        assert(button.hasClass(`Button--${size}`));
        assert(button.hasClass(`Button--${type}`));
      });
    });
  });

  it("throws an error for small, destructive buttons", () => {
    assert.throws(() => {
      shallow(<Button size="small" type="destructive" value="A bad button" />);
    }, "Small destructive buttons are not supported");
  });

  it("renders a <button> element with [type=button]", () => {
    const button = shallow(<Button value="A button" />);
    const expectedHtml = "<button type=\"button\" class=\"Button Button--secondary Button--regular\">A button</button>";
    assert.equal(button.html(), expectedHtml);
  });

  it("renders a <button> element with [type=submit] if props.submit is true", () => {
    const button = shallow(<Button value="A submit button" submit />);
    const expectedHtml = "<button type=\"submit\" class=\"Button Button--secondary Button--regular\">A submit button</button>";
    assert.equal(button.html(), expectedHtml);
  });

  it("renders a <a> element if href is provided", () => {
    const button = shallow(<Button value="A link" href="http://clever.com" />);
    const expectedHtml = "<a class=\"Button Button--secondary Button--regular\" target=\"_blank\" href=\"http://clever.com\">A link</a>";
    assert.equal(button.html(), expectedHtml);
  });

  it("calls the onClick handler when clicked", () => {
    const onClickSpy = sinon.spy();
    const button = shallow(<Button value="A clickable button" onClick={onClickSpy} />);
    button.simulate("click");
    assert(onClickSpy.calledOnce);
  });
});
