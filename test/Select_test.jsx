import assert from "assert";
import {shallow} from "enzyme";
import React from "react";
import ReactSelect from "react-select";
import sinon from "sinon";

import {Select} from "../src";

describe("Select", () => {
  const testOptions = [
    {label: "Test Option 1", value: "testopt1"},
    {label: "Test Option 2", value: "testopt2"},
    {label: "Test Option 3", value: "testopt3"},
    {label: "Test Option 4", value: "testopt4"},
  ];

  it("wraps ReactSelect with an element with the provided id", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        label="test label"
      />
    );
    const idWrapper = select.find("#testid");
    assert.equal(idWrapper.find(ReactSelect).isEmpty(), false);
  });

  it("sets htmlFor for label to point to provided id", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        label="test label"
      />
    );
    const labelContainer = select.find(`.${Select.cssClass.LABEL_CONTAINER}`);
    assert.equal(labelContainer.hasClass(Select.cssClass.LABEL_HIDDEN), false);
    const label = labelContainer.find(`label.${Select.cssClass.LABEL}`);
    assert.equal(label.prop("htmlFor"), "testid");
  });

  it("renders the label when no placeholder is provided", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        label="test label"
      />
    );
    const labelContainer = select.find(`.${Select.cssClass.LABEL_CONTAINER}`);
    assert.equal(labelContainer.hasClass(Select.cssClass.LABEL_HIDDEN), false);
  });

  it("renders the label when a value is selected", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        label="test label"
        placeholder="test placeholder"
        options={testOptions}
        value={testOptions[2]}
      />
    );
    const labelContainer = select.find(`.${Select.cssClass.LABEL_CONTAINER}`);
    assert.equal(labelContainer.hasClass(Select.cssClass.LABEL_HIDDEN), false);
  });

  it("hides the label when a placeholder is provided but no value is selected", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        label="test label"
        placeholder="test placeholder"
      />
    );
    const labelContainer = select.find(`.${Select.cssClass.LABEL_CONTAINER}`);
    assert(labelContainer.hasClass(Select.cssClass.LABEL_HIDDEN));
  });

  it("renders the label when multiple values are selected", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        label="test label"
        placeholder="test placeholder"
        options={testOptions}
        value={[testOptions[2], testOptions[0]]}
      />
    );
    const labelContainer = select.find(`.${Select.cssClass.LABEL_CONTAINER}`);
    assert.equal(labelContainer.hasClass(Select.cssClass.LABEL_HIDDEN), false);
  });

  it("hides the label when a placeholder is provided and value is an empty array", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        label="test label"
        placeholder="test placeholder"
        value={[]}
      />
    );
    const labelContainer = select.find(`.${Select.cssClass.LABEL_CONTAINER}`);
    assert(labelContainer.hasClass(Select.cssClass.LABEL_HIDDEN));
  });

  it("correctly sets the appropriate props on ReactSelect", () => {
    const onChange = sinon.spy();
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        label="test label"
        onChange={onChange}
        options={testOptions}
        placeholder="test placeholder"
        value={testOptions[2]}
      />
    );
    const expectedPropValues = {
      className: Select.cssClass.REACT_SELECT,
      clearable: false,
      multi: false,
      name: "testname",
      onChange,
      options: testOptions,
      placeholder: "test placeholder",
      searchable: false,
      value: testOptions[2],
    };
    const reactSelectProps = select.find(ReactSelect).props();
    for (const prop of Object.keys(expectedPropValues)) {
      assert.equal(reactSelectProps[prop], expectedPropValues[prop]);
    }
  });

  it("allows selecting multiple options if specified", () => {
    const multiSelect = shallow(
      <Select
        id="testid"
        name="testname"
        multi
        options={testOptions}
        value={[testOptions[2], testOptions[0]]}
      />
    );
    const expectedPropValues = {
      multi: true,
      value: [testOptions[2], testOptions[0]],
    };
    const reactSelectProps = multiSelect.find(ReactSelect).props();
    for (const prop of Object.keys(expectedPropValues)) {
      assert.deepEqual(reactSelectProps[prop], expectedPropValues[prop]);
    }
  });

  it("defaults to an empty string placeholder ReactSelect", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
      />
    );
    const reactSelect = select.find(ReactSelect);
    assert.equal(reactSelect.prop("placeholder"), "");
  });
});
