import * as React from "react";
import { shallow } from "enzyme";

import AlertBox2 from "./AlertBox2";
import { Button } from "../Button/Button";

describe("AlertBox2", () => {
  const { cssClass } = AlertBox2;

  const onPerformActionMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(
      <AlertBox2 onPerformAction={onPerformActionMock}>Test Content</AlertBox2>,
    );

    // TODO: Verify basic structure/contents.
    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent).toIncludeText("Test Content");
    expect(myComponent.find(`.${cssClass.SUB_ELEMENT}`)).toExist();
    expect(myComponent.find(Button)).toExist();
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <AlertBox2 className="my--custom--class" onPerformAction={onPerformActionMock}>
        Test Content
      </AlertBox2>,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  // TODO: Test any relevant state changes/event handling/prop-driven rendering.
  it("propagates event", () => {
    const myComponent = shallow(
      <AlertBox2 onPerformAction={onPerformActionMock}>Test Content</AlertBox2>,
    );

    myComponent.find(Button).simulate("click");
    expect(onPerformActionMock).toHaveBeenCalledWith("action performed");
  });
});
