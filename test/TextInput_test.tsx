import * as assert from "assert";
import * as React from "react";
import * as sinon from "sinon";
import { shallow } from "enzyme";
import { TextInput } from "../src";

describe("TextInput", () => {
  let required;

  beforeEach(() => {
    required = false;
  });

  it("renders a <TextInput> element properly with name and default type", () => {
    const textInput = shallow(<TextInput name="TextInputName" />);
    assert.equal(textInput.find("input[type='text']").length, 1);
    assert.equal(textInput.find("input[name='TextInputName']").length, 1);
    assert(textInput.hasClass("TextInput"));
  });

  it("renders a <TextInput> element with different passed type", () => {
    const textInput = shallow(<TextInput name="TextInputName" type="password" />);
    assert.equal(textInput.find("input[type='password']").length, 1);
    assert.equal(textInput.find("input[name='TextInputName']").length, 1);
    assert(textInput.hasClass("TextInput"));
  });

  it("renders a <TextInput> element with passed value and label", () => {
    const textInput = shallow(
      <TextInput name="TextInputPlaceholder" value="TextInputValue" label="TextInputLabel" />,
    );
    assert.equal(textInput.find("input[type='text']").length, 1);
    assert.equal(textInput.find("input[value='TextInputValue']").length, 1);
    assert.equal(textInput.find("label").length, 1);
    assert.equal(textInput.find("label").text(), "TextInputLabel");
  });

  it("renders a <TextInput> element with placeholder if it is passed", () => {
    const textInput = shallow(
      <TextInput name="TextInputPlaceholder" placeholder="PlaceholderText" value="" />,
    );
    assert.equal(textInput.find("input[type='text']").length, 1);
    assert.equal(textInput.find("input[name='TextInputPlaceholder']").length, 1);
    assert.equal(textInput.find("input[placeholder='PlaceholderText']").length, 1);
    assert(textInput.hasClass("TextInput--placeholder-shown-no-caps"));

    // make sure it also works when value is not passed
    const textInput2 = shallow(
      <TextInput name="TextInputPlaceholder" placeholder="PlaceholderText" />,
    );
    assert.equal(textInput2.find("input[type='text']").length, 1);
    assert.equal(textInput2.find("input[name='TextInputPlaceholder']").length, 1);
    assert.equal(textInput2.find("input[placeholder='PlaceholderText']").length, 1);
    assert(textInput2.hasClass("TextInput--placeholder-shown-no-caps"));
  });

  it("properly renders a <TextInput> with an error", () => {
    const textInput = shallow(
      <TextInput name="TextInputPlaceholder" value="TextInputValue" error="This is an error" />,
    );
    assert.equal(textInput.find("input[type='text']").length, 1);
    assert.equal(textInput.find("input[value='TextInputValue']").length, 1);
    assert(textInput.hasClass("TextInput--hasError"));

    // check the span element with error message
    assert.equal(textInput.find("span.TextInput--error").length, 1);
    assert.equal(
      textInput.find('span[aria-live="polite"]').text(),
      "<FontAwesome /> This is an error",
    );
  });

  it("properly renders a <TextInput> with a required flag", () => {
    const textInput = shallow(
      <TextInput name="TextInputPlaceholder" value="TextInputValue" required />,
    );
    assert.equal(textInput.find("input[type='text']").length, 1);
    assert.equal(textInput.find("input[value='TextInputValue']").length, 1);

    // check the span element with required indicator
    assert.equal(textInput.find("span.TextInput--required").length, 1, textInput.html());
    assert.equal(textInput.find('span[aria-live="polite"]').text(), "required");
  });

  it("properly renders a <TextInput> as readonly", () => {
    const textInput = shallow(
      <TextInput name="TextInputPlaceholder" value="TextInputValue" readOnly />,
    );
    assert.equal(textInput.find("input[type='text']").length, 1);
    assert.equal(textInput.find("input[value='TextInputValue']").length, 1);
    assert(textInput.hasClass("TextInput--readonly"));
  });

  it("properly renders a <TextInput> as disabled", () => {
    const textInput = shallow(
      <TextInput name="TextInputPlaceholder" value="TextInputValue" disabled />,
    );
    assert.equal(textInput.find("input[type='text']").length, 1);
    assert.equal(textInput.find("input[value='TextInputValue']").length, 1);
    assert(textInput.hasClass("TextInput--disabled"));
  });

  it("properly calls onChange when <TextInput> value changes", () => {
    const onChangeSpy = sinon.spy();
    const textInput = shallow(<TextInput name="TextInputPlaceholder" onChange={onChangeSpy} />);
    textInput.find("input").simulate("change");
    assert(onChangeSpy.calledOnce);
  });

  it("properly adds focus styles when <TextInput> is in focus", () => {
    const textInput = shallow(<TextInput name="TextInputPlaceholder" />);
    textInput.find("input").simulate("focus");
    assert(textInput.hasClass("TextInput--inFocus"));
  });

  it("toggles between type 'password' and 'text' when Show is clicked", () => {
    const textInput = shallow(<TextInput name="TextInputPlaceholder" type="password" enableShow />);
    assert.equal(textInput.find("input[type='password']").length, 1);
    assert.equal(textInput.find("input[type='text']").length, 0);
    textInput.find("button.TextInput--link").simulate("click");
    assert.equal(textInput.find("input[type='password']").length, 0);
    assert.equal(textInput.find("input[type='text']").length, 1);
  });

  describe("When the input is filled out", () => {
    it("does not display an error message", () => {
      const component = shallowComponent();
      setValue(component, "jish");
      const errors = component.find(".TextInput--error");

      assert.equal(errors.length, 0, "There is no error");
    });
  });

  describe("When the input is left blank", () => {
    it("does not display an error message", () => {
      const component = shallowComponent();
      setValue(component, "");
      const errors = component.find(".TextInput--error");

      assert.equal(errors.length, 0, "There is no error");
    });
  });

  describe("Given the TextInput is required", () => {
    beforeEach(() => {
      required = true;
    });

    it("displays a required note", () => {
      const component = shallowComponent();
      const requiredNote = component.find(".TextInput--required");

      assert.equal(requiredNote.length, 1, "It displays a required note");
      assert.equal(requiredNote.text(), "required");
    });

    describe("When the input is filled out", () => {
      it("does not display an error message", () => {
        const component = shallowComponent();
        setValue(component, "jish");
        const errors = component.find(".TextInput--error");

        assert.equal(errors.length, 0, "There is no error");
      });
    });

    describe("When the input is left blank", () => {
      it("displays an error message", () => {
        const component = shallowComponent();
        setValue(component, "");
        const errors = component.find(".TextInput--error");

        assert.equal(errors.length, 1, "There is an error");
      });
    });
  });

  function setValue(component, newValue) {
    const input = component.find("input");

    input.simulate("focus");
    component.setProps({ value: newValue });
    input.simulate("blur");

    return component;
  }

  function shallowComponent() {
    return shallow(<TextInput name="username" required={required} />);
  }
});
