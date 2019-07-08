/* eslint func-names: "off" */

import * as assert from "assert";
import * as React from "react";
import * as sinon from "sinon";
import { shallow } from "enzyme";
import { Button } from "../src";

describe("Button", () => {
  const sizes = ["small", "regular", "large"];
  const types = ["primary", "secondary", "destructive", "link", "linkPlain"];

  sizes.forEach(size => {
    types.forEach(type => {
      if (size === "small" && type === "destructive") return;

      it(`renders a ${size}, ${type} button with the correct classes`, () => {
        const button = shallow(
          <Button size={size} type={type} value="A button" className="customClass" />,
        );
        assert(button.hasClass("Button"));
        assert(button.hasClass(`Button--${size}`));
        assert(button.hasClass(`Button--${type}`));
        assert(button.hasClass("customClass"));
      });
    });
  });

  it("throws an error for small, destructive buttons", () => {
    assert.throws(() => {
      shallow(<Button size="small" type="destructive" value="A bad button" />);
    }, /Small destructive buttons are not supported$/);
  });

  it("renders a <button> element with [type=button]", () => {
    const button = shallow(<Button value="A button" />);
    assert.equal(button.find("button[type='button']").length, 1);
    assert.equal(button.text(), "A button");
    assert.equal(button.props()["aria-label"], "A button");
  });

  it("renders a <button> element with [type=submit] if submit is true", () => {
    const button = shallow(<Button value="A submit button" submit />);
    assert.equal(button.find("button[type='submit']").length, 1);
    assert.equal(button.text(), "A submit button");
    assert.equal(button.props()["aria-label"], "A submit button");
  });

  it("renders a <a> element if href is provided", () => {
    const button = shallow(<Button value="A link" href="http://clever.com" />);
    assert.equal(button.find("a[target='_blank']").length, 1);
    assert.equal(button.text(), "A link");
    assert.equal(button.props()["aria-label"], "A link");
  });

  it("throws an error if href and submit are both set", () => {
    assert.throws(() => {
      shallow(<Button value="A bad button" href="http://clever.com" submit />);
    }, /Buttons with href do not support the submit option$/);
  });

  it("calls the onClick handler when clicked", () => {
    const onClickSpy = sinon.spy();
    const button = shallow(<Button value="A clickable button" onClick={onClickSpy} />);
    button.simulate("click");
    assert(onClickSpy.calledOnce);
  });
});
