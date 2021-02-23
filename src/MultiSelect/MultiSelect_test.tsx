import * as React from "react";
import { shallow } from "enzyme";

import MultiSelect from "./MultiSelect";
import { Button } from "../Button/Button";

describe("MultiSelect", () => {
  const { cssClass } = MultiSelect;

  const onPerformActionMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(
      <MultiSelect onPerformAction={onPerformActionMock}>Test Content</MultiSelect>,
    );

    // TODO: Verify basic structure/contents.
    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent).toIncludeText("Test Content");
    expect(myComponent.find(`.${cssClass.SUB_ELEMENT}`)).toExist();
    expect(myComponent.find(Button)).toExist();
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <MultiSelect className="my--custom--class" onPerformAction={onPerformActionMock}>
        Test Content
      </MultiSelect>,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  // TODO: Test any relevant state changes/event handling/prop-driven rendering.
  it("propagates event", () => {
    const myComponent = shallow(
      <MultiSelect onPerformAction={onPerformActionMock}>Test Content</MultiSelect>,
    );

    myComponent.find(Button).simulate("click");
    expect(onPerformActionMock).toHaveBeenCalledWith("action performed");
  });
});
