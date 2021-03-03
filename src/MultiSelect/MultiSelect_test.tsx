import * as React from "react";
import { shallow } from "enzyme";

import MultiSelect, { cssClass, getSelectableOptions, ADD_NEW_ITEM_KEY } from "./MultiSelect";

describe("MultiSelect", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(
      <MultiSelect name="MultiSelect--name" label="testLabel" options={[{ value: "Option 1" }]} />,
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
        options={[{ value: "Option 1" }]}
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

  describe("getSelectableOptions", () => {
    describe("not creatable", () => {
      it("returns original options when nothing is selected", () => {
        const options = [
          { value: "testOption1" },
          { value: "testOption2" },
          { value: "testOption3" },
          { value: "testOption4" },
        ];
        const results = getSelectableOptions(options, [], "", false);
        expect(results).toEqual(options);
      });

      it("filters out selected options", () => {
        const options = [
          { value: "testOption1" },
          { value: "testOption2" },
          { value: "testOption3" },
          { value: "testOption4" },
        ];
        const results = getSelectableOptions(options, options, "", false);
        expect(results).toEqual([]);
      });

      it("filters out options based on typed input", () => {
        const options = [
          { value: "testOption1" },
          { value: "testOption2" },
          { value: "filtered1" },
          { value: "filtered2" },
        ];
        const results = getSelectableOptions(options, [], "option", false);
        expect(results).toEqual(options.slice(0, 2));
      });

      it("filters out selected options and typed input", () => {
        const options = [
          { value: "testOption1" },
          { value: "testOption2" },
          { value: "filtered1" },
          { value: "filtered2" },
        ];
        const results = getSelectableOptions(options, [{ value: "testOption2" }], "option", false);
        expect(results).toEqual([{ value: "testOption1" }]);
      });
    });

    describe("creatable", () => {
      it("adds ADD_ITEM option when something unique is typed", () => {
        const options = [
          { value: "testOption1" },
          { value: "testOption2" },
          { value: "testOption3" },
          { value: "testOption4" },
        ];
        const results = getSelectableOptions(options, [], "uniqueText", true);
        expect(results).toEqual([{ value: ADD_NEW_ITEM_KEY }]);
      });

      it("does not add ADD_ITEM option when exact match is typed and item is selectable", () => {
        const options = [
          { value: "testOption1" },
          { value: "testOption2" },
          { value: "testOption3" },
          { value: "testOption4" },
        ];
        const results = getSelectableOptions(options, [], "testOption1", true);
        expect(results).toEqual([{ value: "testOption1" }]);
      });

      it("does not add ADD_ITEM option when exact match is typed and item is already selected", () => {
        const options = [
          { value: "testOption1" },
          { value: "testOption2" },
          { value: "testOption3" },
          { value: "testOption4" },
        ];
        const results = getSelectableOptions(
          options,
          [{ value: "testOption1" }],
          "testOption1",
          true,
        );
        expect(results).toEqual([]);
      });

      it("does not add ADD_ITEM option when all items filtered but no input value", () => {
        const options = [
          { value: "testOption1" },
          { value: "testOption2" },
          { value: "testOption3" },
          { value: "testOption4" },
        ];
        const results = getSelectableOptions(options, options, "", true);
        expect(results).toEqual([]);
      });
    });
  });
});
