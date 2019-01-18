import * as React from "react";
import {shallow} from "enzyme";

import Popover from "./Popover";
import {Button} from "../Button/Button";

describe("Popover", () => {
  const {cssClass} = Popover;

  const onPerformActionMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(
      <Popover onPerformAction={onPerformActionMock}>Test Content</Popover>,
    );

    // TODO: Verify basic structure/contents.
    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent).toIncludeText("Test Content");
    expect(myComponent.find(`.${cssClass.SUB_ELEMENT}`)).toBePresent();
    expect(myComponent.find(Button)).toBePresent();
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <Popover className="my--custom--class" onPerformAction={onPerformActionMock}>
        Test Content
      </Popover>,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  // TODO: Test any relevant state changes/event handling/prop-driven rendering.
  it("propagates event", () => {
    const myComponent = shallow(
      <Popover onPerformAction={onPerformActionMock}>
        Test Content
      </Popover>,
    );

    myComponent.find(Button).simulate("click");
    expect(onPerformActionMock).toHaveBeenCalledWith("action performed");
  });
});
