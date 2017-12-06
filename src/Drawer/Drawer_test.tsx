import * as React from "react";
import {shallow} from "enzyme";

import Drawer from "./Drawer";
import {Button} from "../Button/Button";

describe("Drawer", () => {
  const {cssClass} = Drawer;

  const onPerformActionMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(
      <Drawer onPerformAction={onPerformActionMock}>Test Content</Drawer>,
    );

    // TODO: Verify basic structure/contents.
    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent).toIncludeText("Test Content");
    expect(myComponent.find(`.${cssClass.SUB_ELEMENT}`)).toBePresent();
    expect(myComponent.find(Button)).toBePresent();
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <Drawer className="my--custom--class" onPerformAction={onPerformActionMock}>
        Test Content
      </Drawer>,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  // TODO: Test any relevant state changes/event handling/prop-driven rendering.
  it("propagates event", () => {
    const myComponent = shallow(
      <Drawer onPerformAction={onPerformActionMock}>
        Test Content
      </Drawer>,
    );

    myComponent.find(Button).simulate("click");
    expect(onPerformActionMock).toHaveBeenCalledWith("action performed");
  });
});
