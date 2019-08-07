import * as React from "react";
import { shallow } from "enzyme";

import { Autosuggest } from "./Autosuggest";
import { Button } from "../Button/Button";

describe("Autosuggest", () => {
  const { cssClass } = Autosuggest;

  const onPerformActionMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(
      <Autosuggest
        onChange={() => null}
        onSuggestionsFetchRequested={() => null}
        value={"Test Content"}
      />,
    );

    // TODO: Verify basic structure/contents.
    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent).toIncludeText("Test Content");
    // expect(myComponent.find(`.${cssClass.SUB_ELEMENT}`)).toExist();
    // expect(myComponent.find(Button)).toExist();
  });

  it("supports additional class names", () => {
    const myComponent = shallow(
      <Autosuggest className="my--custom--class" onPerformAction={onPerformActionMock}>
        Test Content
      </Autosuggest>,
    );

    expect(myComponent.props().className).toMatch(cssClass.CONTAINER);
    expect(myComponent.props().className).toMatch("my--custom--class");
  });

  // TODO: Test any relevant state changes/event handling/prop-driven rendering.
  it("propagates event", () => {
    const myComponent = shallow(
      <Autosuggest onPerformAction={onPerformActionMock}>Test Content</Autosuggest>,
    );

    myComponent.find(Button).simulate("click");
    expect(onPerformActionMock).toHaveBeenCalledWith("action performed");
  });
});
