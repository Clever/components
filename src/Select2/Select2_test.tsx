import * as React from "react";
import { shallow } from "enzyme";

import Select2 from "./Select2";
import { Button } from "../Button/Button";

describe("Select2", () => {
  const { cssClass } = Select2;

  const onPerformActionMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(
      <Select2 onPerformAction={onPerformActionMock}>Test Content</Select2>,
    );

    // TODO: Verify basic structure/contents.
    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent).toIncludeText("Test Content");
    expect(myComponent.find(`.${cssClass.SUB_ELEMENT}`)).toExist();
    expect(myComponent.find(Button)).toExist();
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <Select2 className="my--custom--class" onPerformAction={onPerformActionMock}>
        Test Content
      </Select2>,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  // TODO: Test any relevant state changes/event handling/prop-driven rendering.
  it("propagates event", () => {
    const myComponent = shallow(
      <Select2 onPerformAction={onPerformActionMock}>Test Content</Select2>,
    );

    myComponent.find(Button).simulate("click");
    expect(onPerformActionMock).toHaveBeenCalledWith("action performed");
  });
});
