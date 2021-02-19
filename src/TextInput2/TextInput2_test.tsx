import * as React from "react";
import { shallow } from "enzyme";

import TextInput2, { cssClass } from "./TextInput2";

describe("TextInput2", () => {
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

  // TODO: Test any relevant state changes/event handling/prop-driven rendering.
  /*
  it("propagates event", () => {
    const myComponent = shallow(
      <TextInput2 onPerformAction={onPerformActionMock}>Test Content</TextInput2>,
    );

    myComponent.find(Button).simulate("click");
    expect(onPerformActionMock).toHaveBeenCalledWith("action performed");
  });
  */
});
