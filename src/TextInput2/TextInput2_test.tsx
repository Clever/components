import * as React from "react";
import { shallow, mount } from "enzyme";

import TextInput2, { cssClass } from "./TextInput2";

// util functions
const getInput = (wrapper) => wrapper.find("input");
const getErrorContainer = (wrapper) => wrapper.find(`.${cssClass.INPUT_CONTAINER_ERROR}`);
const changeInputValue = (input, value) => {
  input.simulate("change", { target: { value } });
};

describe("TextInput2", () => {
  let defaultProps;
  beforeEach(() => {
    defaultProps = {
      name: "",
      label: "",
      value: "",
      onChange: jest.fn(),
    };
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(
      <TextInput2
        name="TextInput2--name"
        label="testLabel"
        value="testValue"
        onChange={() => undefined}
      >
        Test Content
      </TextInput2>,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent).toIncludeText("testLabel");
    expect(myComponent.find(`.${cssClass.INPUT}`)).toExist();
    expect(myComponent.find("input").props().value).toBe("testValue");
    expect(myComponent.find("input")).toExist();
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <TextInput2
        className="my--custom--class"
        name="TextInput2--name"
        label="testLabel"
        value="testValue"
        onChange={() => undefined}
      >
        Test Content
      </TextInput2>,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  describe("error validation", () => {
    const validValue = "valid";
    const invalidValue = "invalid";
    let wrapper;
    beforeEach(() => {
      defaultProps = {
        ...defaultProps,
        errorValidation: (value) => (value === invalidValue ? "test error message" : null),
        onChange: (e) => {
          wrapper.setProps({ value: e.target.value });
          wrapper.update();
        },
      };
    });

    it("displays error while focused and errorOnFocus is true", () => {
      defaultProps.errorOnFocus = true;
      wrapper = mount(<TextInput2 {...defaultProps} />);
      const input = getInput(wrapper);

      input.simulate("focus");
      changeInputValue(input, invalidValue);
      const errorContainer = getErrorContainer(wrapper);
      // error should be dsiplayed while element is still in focus
      expect(errorContainer).toExist();
    });

    it("displays error on blur if provided errorValidation function returns a string", () => {
      wrapper = mount(<TextInput2 {...defaultProps} />);
      const input = getInput(wrapper);

      input.simulate("focus");
      changeInputValue(input, invalidValue);
      let errorContainer = getErrorContainer(wrapper);
      // error should not be displayed while element is still in focus
      expect(errorContainer).not.toExist();

      input.simulate("blur");
      errorContainer = getErrorContainer(wrapper);
      // error is displayed after focus is removed
      expect(errorContainer).toExist();
    });

    it("removes error while focused if provided errorValidation function returns null", () => {
      defaultProps.value = invalidValue;
      wrapper = mount(<TextInput2 {...defaultProps} />);
      let errorContainer = getErrorContainer(wrapper);
      // error is already present from invalid value
      expect(errorContainer).toExist();

      const input = getInput(wrapper);
      input.simulate("focus");
      changeInputValue(input, validValue);
      errorContainer = getErrorContainer(wrapper);
      // error is removed after valid value is set
      expect(errorContainer).not.toExist();
    });

    it("removes error if input value is empty string", () => {
      defaultProps.value = invalidValue;
      wrapper = mount(<TextInput2 {...defaultProps} />);
      let errorContainer = getErrorContainer(wrapper);
      // error is already present from invalid value
      expect(errorContainer).toExist();

      const input = getInput(wrapper);
      input.simulate("focus");
      changeInputValue(input, "");
      errorContainer = getErrorContainer(wrapper);
      // error is removed after value is set to empty string
      expect(errorContainer).not.toExist();
    });

    it("displays error if value is empty string and errorOnEmpty is true", () => {
      defaultProps.errorOnEmpty = true;
      defaultProps.value = "";
      wrapper = mount(<TextInput2 {...defaultProps} />);
      const errorContainer = getErrorContainer(wrapper);
      // error is displayed for empty value
      expect(errorContainer).toExist();
    });

    it("removes error on focus if value is empty string and errorOnEmpty is true", () => {
      defaultProps.errorOnEmpty = true;
      defaultProps.value = "";
      wrapper = mount(<TextInput2 {...defaultProps} />);
      const input = getInput(wrapper);

      let errorContainer = getErrorContainer(wrapper);
      // error is displayed for empty value
      expect(errorContainer).toExist();

      input.simulate("focus");
      errorContainer = getErrorContainer(wrapper);
      // empty error is removed on focus
      expect(errorContainer).not.toExist();
    });
  });

  describe("event handling", () => {
    it("executes onFocus prop if provided", () => {
      defaultProps.onFocus = jest.fn();
      const wrapper = shallow(<TextInput2 {...defaultProps} />);
      getInput(wrapper).simulate("focus");
      expect(defaultProps.onFocus).toHaveBeenCalled();
    });

    it("executes onBlur prop if provided", () => {
      defaultProps.onBlur = jest.fn();
      const wrapper = shallow(<TextInput2 {...defaultProps} />);
      getInput(wrapper).simulate("blur");
      expect(defaultProps.onBlur).toHaveBeenCalled();
    });
  });
});
