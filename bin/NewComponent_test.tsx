import * as React from "react";
import { shallow } from "enzyme";

import NewComponent from "./NewComponent";
import { Button } from "../Button/Button";

describe("NewComponent", () => {
  const { cssClass } = NewComponent;

  const onPerformActionMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(
      <NewComponent onPerformAction={onPerformActionMock}>Test Content</NewComponent>,
    );

    // TODO: Verify basic structure/contents.
    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent).toIncludeText("Test Content");
    expect(myComponent.find(`.${cssClass.SUB_ELEMENT}`)).toExist();
    expect(myComponent.find(Button)).toExist();
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <NewComponent className="my--custom--class" onPerformAction={onPerformActionMock}>
        Test Content
      </NewComponent>,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  // TODO: Test any relevant state changes/event handling/prop-driven rendering.
  it("propagates event", () => {
    const myComponent = shallow(
      <NewComponent onPerformAction={onPerformActionMock}>Test Content</NewComponent>,
    );

    myComponent.find(Button).simulate("click");
    expect(onPerformActionMock).toHaveBeenCalledWith("action performed");
  });
});
