import * as React from "react";
import { shallow } from "enzyme";

import Select2, { cssClass } from "./Select2";

describe("Select2", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(
      <Select2 name="Select2--name" label="testLabel" options={[{ value: "Option 1" }]} />,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent).toIncludeText("testLabel");
    expect(myComponent.find(`.${cssClass.INPUT}`)).toExist();
    expect(myComponent.find("input")).toExist();
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <Select2
        className="my--custom--class"
        name="Select2--name"
        label="testLabel"
        options={[{ value: "Option 1" }]}
      />,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  /*
  // TODO: Test any relevant state changes/event handling/prop-driven rendering.
  it("propagates event", () => {
    const myComponent = shallow(
      <Select2 onPerformAction={onPerformActionMock}>Test Content</Select2>,
    );

    myComponent.find(Button).simulate("click");
    expect(onPerformActionMock).toHaveBeenCalledWith("action performed");
  });
  */
});
