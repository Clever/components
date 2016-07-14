import assert from "assert";
import React from "react";
import sinon from "sinon";
import {shallow} from "enzyme";
import {TextInput} from "../src";

describe("TextInput", () => {
  it("renders a <TextInput> element properly with name and default type", () => {
    const textInput = shallow(
      <TextInput
        name="TextInputName"
      />
    );
    assert.equal(textInput.find("input[type='text']").length, 1);
    assert.equal(textInput.find("input[name='TextInputName']").length, 1);
    assert(textInput.hasClass("TextInput"));
  });

  it("renders a <TextInput> element with different passed type", () => {
    const textInput = shallow(
      <TextInput
        name="TextInputName"
        type="password"
      />
    );
    assert.equal(textInput.find("input[type='password']").length, 1);
    assert.equal(textInput.find("input[name='TextInputName']").length, 1);
    assert(textInput.hasClass("TextInput"));
  });

  it("renders a <TextInput> element with passed value and label", () => {
    const textInput = shallow(
      <TextInput
        name="TextInputPlaceholder"
        value="TextInputValue"
        label="TextInputLabel"
      />
    );
    assert.equal(textInput.find("input[type='text']").length, 1);
    assert.equal(textInput.find("input[value='TextInputValue']").length, 1);
    assert.equal(textInput.find("label").length, 1);
    assert.equal(textInput.find("label").text(), "TextInputLabel");
  });

  it("renders a <TextInput> element with placeholder if it is passed", () => {
    const textInput = shallow(
      <TextInput
        name="TextInputPlaceholder"
        placeholder="PlaceholderText"
        value=""
      />
    );
    assert.equal(textInput.find("input[type='text']").length, 1);
    assert.equal(textInput.find("input[name='TextInputPlaceholder']").length, 1);
    assert.equal(textInput.find("input[placeholder='PlaceholderText']").length, 1);
    assert(textInput.hasClass("TextInput--placeholder-shown"));

    // make sure it also works when value is not passed
    const textInput2 = shallow(
      <TextInput
        name="TextInputPlaceholder"
        placeholder="PlaceholderText"
      />
    );
    assert.equal(textInput2.find("input[type='text']").length, 1);
    assert.equal(textInput2.find("input[name='TextInputPlaceholder']").length, 1);
    assert.equal(textInput2.find("input[placeholder='PlaceholderText']").length, 1);
    assert(textInput2.hasClass("TextInput--placeholder-shown"));
  });

  it("properly renders a <TextInput> with an error", () => {
    const textInput = shallow(
      <TextInput
        name="TextInputPlaceholder"
        value="TextInputValue"
        error="This is an error"
      />
    );
    assert.equal(textInput.find("input[type='text']").length, 1);
    assert.equal(textInput.find("input[value='TextInputValue']").length, 1);
    assert(textInput.hasClass("TextInput--hasError"));

    // check the span element with error message
    assert.equal(textInput.find("span").length, 1);
    assert.equal(textInput.find("span").text(), "This is an error");
    assert(textInput.find("span").hasClass("TextInput--error"));
  });

  it("properly renders a <TextInput> with a required flag", () => {
    const textInput = shallow(
      <TextInput
        name="TextInputPlaceholder"
        value="TextInputValue"
        required
      />
    );
    assert.equal(textInput.find("input[type='text']").length, 1);
    assert.equal(textInput.find("input[value='TextInputValue']").length, 1);

    // check the span element with required indicator
    assert.equal(textInput.find("span").length, 1);
    assert.equal(textInput.find("span").text(), "required");
    assert(textInput.find("span").hasClass("TextInput--required"));
  });

  it("properly renders a <TextInput> as readonly", () => {
    const textInput = shallow(
      <TextInput
        name="TextInputPlaceholder"
        value="TextInputValue"
        readOnly
      />
    );
    assert.equal(textInput.find("input[type='text']").length, 1);
    assert.equal(textInput.find("input[value='TextInputValue']").length, 1);
    assert(textInput.hasClass("TextInput--readonly"));
  });

  it("properly renders a <TextInput> as disabled", () => {
    const textInput = shallow(
      <TextInput
        name="TextInputPlaceholder"
        value="TextInputValue"
        disabled
      />
    );
    assert.equal(textInput.find("input[type='text']").length, 1);
    assert.equal(textInput.find("input[value='TextInputValue']").length, 1);
    assert(textInput.hasClass("TextInput--disabled"));
  });


  it("properly calls onChange when <TextInput> value changes", () => {
    const onChangeSpy = sinon.spy();
    const textInput = shallow(
      <TextInput
        name="TextInputPlaceholder"
        onChange={onChangeSpy}
      />
    );
    textInput.find("input").simulate("change");
    assert(onChangeSpy.calledOnce);
  });


  it("properly adds focus styles when <TextInput> is in focus", () => {
    const textInput = shallow(
      <TextInput
        name="TextInputPlaceholder"
      />
    );
    textInput.find("input").simulate("focus");
    assert(textInput.hasClass("TextInput--inFocus"));
  });
});
