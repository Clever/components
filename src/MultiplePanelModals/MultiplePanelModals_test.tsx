import * as React from "react";
import {shallow} from "enzyme";

import MultiplePanelModals from "./MultiplePanelModals";
import {Button} from "../Button/Button";

describe("MultiplePanelModals", () => {
  const {cssClass} = MultiplePanelModals;

  const onPerformActionMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(
      <MultiplePanelModals onPerformAction={onPerformActionMock}>Test Content</MultiplePanelModals>,
    );

    // TODO: Verify basic structure/contents.
    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent).toIncludeText("Test Content");
    expect(myComponent.find(`.${cssClass.SUB_ELEMENT}`)).toBePresent();
    expect(myComponent.find(Button)).toBePresent();
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <MultiplePanelModals className="my--custom--class" onPerformAction={onPerformActionMock}>
        Test Content
      </MultiplePanelModals>,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  // TODO: Test any relevant state changes/event handling/prop-driven rendering.
  it("propagates event", () => {
    const myComponent = shallow(
      <MultiplePanelModals onPerformAction={onPerformActionMock}>
        Test Content
      </MultiplePanelModals>,
    );

    myComponent.find(Button).simulate("click");
    expect(onPerformActionMock).toHaveBeenCalledWith("action performed");
  });
});
