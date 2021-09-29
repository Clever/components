import * as React from "react";
import { shallow } from "enzyme";

import TextInput2, { cssClass } from "./TextInput2";

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

  describe("event handling", () => {
    it("executes onFocus prop if provided", () => {
      defaultProps.onFocus = jest.fn();
      const wrapper = shallow(<TextInput2 {...defaultProps} />);
      wrapper.find("input").simulate("focus");
      expect(defaultProps.onFocus).toHaveBeenCalled();
    });

    it("executes onBlur prop if provided", () => {
      defaultProps.onBlur = jest.fn();
      const wrapper = shallow(<TextInput2 {...defaultProps} />);
      wrapper.find("input").simulate("blur");
      expect(defaultProps.onBlur).toHaveBeenCalled();
    });
  });
});
