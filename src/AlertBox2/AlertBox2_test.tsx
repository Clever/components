import * as React from "react";
import { shallow } from "enzyme";

import { AlertBox2, AlertBox2Type, cssClass } from "./AlertBox2";

describe("AlertBox2", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(<AlertBox2 type={AlertBox2Type.CAUTION}>Test Content</AlertBox2>);

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent).toIncludeText("Test Content");
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <AlertBox2 className="my--custom--class" type={AlertBox2Type.CAUTION}>
        Test Content
      </AlertBox2>,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  /*
  // TODO: Test any relevant state changes/event handling/prop-driven rendering.
  it("propagates event", () => {
    const myComponent = shallow(
      <AlertBox2 onPerformAction={onPerformActionMock}>Test Content</AlertBox2>,
    );

    myComponent.find(Button).simulate("click");
    expect(onPerformActionMock).toHaveBeenCalledWith("action performed");
  });
  */
});
