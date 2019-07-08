import assert from "assert";
import React from "react";
import sinon from "sinon";
import { shallow } from "enzyme";
import { TextArea } from "../src";

describe("TextArea", () => {
  it("renders a <TextArea> element properly with name", () => {
    const textArea = shallow(<TextArea name="TextAreaParagraph" />);
    assert.equal(textArea.find("textarea[name='TextAreaParagraph']").length, 1);
    assert(textArea.hasClass("TextArea"));
  });

  it("renders a <TextArea> element with placeholder", () => {
    const textArea = shallow(<TextArea name="TextAreaPlaceholder" placeholder="PlaceholderText" />);

    assert.equal(textArea.find("textarea").length, 1);
    assert.equal(textArea.find("textarea[name='TextAreaPlaceholder']").length, 1);
    assert.equal(textArea.find("textarea[placeholder='PlaceholderText']").length, 1);
    assert(textArea.hasClass("TextArea--placeholder-shown"));
  });

  it("properly renders a <TextArea> element with a value", () => {
    const textArea = shallow(<TextArea name="TextAreaParagraph" value="TextAreaValue" />);

    assert.equal(textArea.find("textarea").length, 1);
    assert.equal(textArea.find("textarea[value='TextAreaValue']").length, 1);
  });

  it("properly renders a <TextInput> as readonly", () => {
    const textArea = shallow(<TextArea name="TextAreaParagraph" readOnly />);
    assert.equal(textArea.find("textarea").length, 1);
    assert(textArea.hasClass("TextArea--readonly"));
  });

  it("properly renders a <TextInput> as disabled", () => {
    const textArea = shallow(<TextArea name="TextAreaParagraph" disabled />);
    assert.equal(textArea.find("textarea").length, 1);
    assert(textArea.hasClass("TextArea--disabled"));
  });

  it("properly calls onChange when <TextArea> value changes", () => {
    const onChangeSpy = sinon.spy();
    const textArea = shallow(<TextArea name="TextAreaParagraph" onChange={onChangeSpy} />);
    textArea.find("textarea").simulate("change");
    assert(onChangeSpy.calledOnce);
  });
});
