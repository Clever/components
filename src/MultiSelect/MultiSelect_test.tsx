import * as React from "react";
import { shallow } from "enzyme";

import MultiSelect, { cssClass, getSelectableOptions, ADD_NEW_ITEM_KEY } from "./MultiSelect";

describe("MultiSelect", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders", () => {
    const myComponent = shallow(
      <MultiSelect
        name="MultiSelect--name"
        label="testLabel"
        options={[{ label: "Option 1", value: "Option 1" }]}
        values={[]}
        onChange={() => undefined}
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
        options={[{ label: "Option 1", value: "Option 1" }]}
        values={[]}
        onChange={() => undefined}
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
          { label: "Test Option 1", value: "testOption1" },
          { label: "Test Option 2", value: "testOption2" },
          { label: "Test Option 3", value: "testOption3" },
          { label: "Test Option 4", value: "testOption4" },
        ];
        const results = getSelectableOptions(options, [], "", false, false);
        expect(results).toEqual(options);
      });

      it("filters out selected options", () => {
        const options = [
          { label: "Test Option 1", value: "testOption1" },
          { label: "Test Option 2", value: "testOption2" },
          { label: "Test Option 3", value: "testOption3" },
          { label: "Test Option 4", value: "testOption4" },
        ];
        const results = getSelectableOptions(
          options,
          options.map((o) => o.value),
          "",
          false,
          false
        );
        expect(results).toEqual([]);
      });

      it("filters out options based on typed input", () => {
        const options = [
          { label: "Test Option 1", value: "testOption1" },
          { label: "Test Option 2", value: "testOption2" },
          { label: "Filtered Option 1", value: "filtered1" },
          { label: "Filtered Option 2", value: "filtered2" },
        ];
        const results = getSelectableOptions(options, [], "test o", false, false);
        expect(results).toEqual(options.slice(0, 2));
      });

      it("filters out selected options and typed input", () => {
        const options = [
          { label: "Test Option 1", value: "testOption1" },
          { label: "Test Option 2", value: "testOption2" },
          { label: "Filtered Option 1", value: "filtered1" },
          { label: "Filtered Option 2", value: "filtered2" },
        ];
        const results = getSelectableOptions(options, ["testOption2"], "test o", false, false);
        expect(results).toEqual([{ label: "Test Option 1", value: "testOption1" }]);
      });
    });

    describe("creatable", () => {
      it("adds ADD_ITEM option when something unique is typed", () => {
        const options = [
          { label: "Test Option 1", value: "testOption1" },
          { label: "Test Option 2", value: "testOption2" },
          { label: "Test Option 3", value: "testOption3" },
          { label: "Test Option 4", value: "testOption4" },
        ];
        const results = getSelectableOptions(options, [], "uniqueText", true, false);
        expect(results).toEqual([{ value: ADD_NEW_ITEM_KEY }]);
      });

      it("does not add ADD_ITEM option when exact match is typed and item is selectable", () => {
        const options = [
          { label: "Test Option 1", value: "testOption1" },
          { label: "Test Option 2", value: "testOption2" },
          { label: "Test Option 3", value: "testOption3" },
          { label: "Test Option 4", value: "testOption4" },
        ];
        const results = getSelectableOptions(options, [], "Test Option 1", true, false);
        expect(results).toEqual([{ label: "Test Option 1", value: "testOption1" }]);
      });

      it("does not add ADD_ITEM option when exact match is typed and item is already selected", () => {
        const options = [
          { label: "Test Option 1", value: "testOption1" },
          { label: "Test Option 2", value: "testOption2" },
          { label: "Test Option 3", value: "testOption3" },
          { label: "Test Option 4", value: "testOption4" },
        ];
        const results = getSelectableOptions(options, ["testOption1"], "Test Option 1", true, false);
        expect(results).toEqual([]);
      });

      it("does not add ADD_ITEM option when all items filtered but no input value", () => {
        const options = [
          { label: "Test Option 1", value: "testOption1" },
          { label: "Test Option 2", value: "testOption2" },
          { label: "Test Option 3", value: "testOption3" },
          { label: "Test Option 4", value: "testOption4" },
        ];
        const results = getSelectableOptions(
          options,
          options.map((o) => o.value),
          "",
          true,
          false
        );
        expect(results).toEqual([]);
      });
    });
  });
});
