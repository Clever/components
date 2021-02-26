import * as React from "react";
import { shallow } from "enzyme";

import MultiSelect, { cssClass } from "./MultiSelect";

describe("MultiSelect", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(
      <MultiSelect
        name="MultiSelect--name"
        label="testLabel"
        items={[{ key: "key1", stringValue: "Option 1" }]}
      />,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent).toIncludeText("testLabel");
    expect(myComponent.find(`.${cssClass.INPUT}`)).toExist();
    expect(myComponent.find("input")).toExist();
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <MultiSelect
        className="my--custom--class"
        name="MultiSelect--name"
        label="testLabel"
        items={[{ key: "key1", stringValue: "Option 1" }]}
      />,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  // TODO: Test any relevant state changes/event handling/prop-driven rendering.
  /*
  it("propagates event", () => {
    const myComponent = shallow(
      <MultiSelect onPerformAction={onPerformActionMock}>Test Content</MultiSelect>,
    );

    myComponent.find(Button).simulate("click");
    expect(onPerformActionMock).toHaveBeenCalledWith("action performed");
  });
  */
});
