import _ from "lodash";
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
        options={[]}
      />
    );
    const idWrapper = select.find("#testid");
    assert(idWrapper.find(ReactSelect).exists());
  });

  it("sets htmlFor for label to point to provided id", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        label="test label"
        options={[]}
      />
    );
    const label = select.find(`label.${Select.cssClass.LABEL}`);
    assert.equal(label.hasClass(Select.cssClass.LABEL_HIDDEN), false);
    assert.equal(label.prop("htmlFor"), "testid");
  });

  it("renders the label when no placeholder is provided", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        label="test label"
        options={[]}
      />
    );
    const label = select.find(`.${Select.cssClass.LABEL}`);
    assert.equal(label.hasClass(Select.cssClass.LABEL_HIDDEN), false);
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
    const label = select.find(`.${Select.cssClass.LABEL}`);
    assert.equal(label.hasClass(Select.cssClass.LABEL_HIDDEN), false);
  });

  it("hides the label when a placeholder is provided but no value is selected", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        label="test label"
        placeholder="test placeholder"
        options={[]}
      />
    );
    const label = select.find(`.${Select.cssClass.LABEL}`);
    assert(label.hasClass(Select.cssClass.LABEL_HIDDEN));
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
    const label = select.find(`.${Select.cssClass.LABEL}`);
    assert.equal(label.hasClass(Select.cssClass.LABEL_HIDDEN), false);
  });

  it("hides the label when a placeholder is provided and value is an empty array", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        label="test label"
        placeholder="test placeholder"
        value={[]}
        options={[]}
      />
    );
    const label = select.find(`.${Select.cssClass.LABEL}`);
    assert(label.hasClass(Select.cssClass.LABEL_HIDDEN));
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
      disabled: false,
      multi: false,
      name: "testname",
      onChange,
      options: testOptions,
      placeholder: "test placeholder",
      searchable: false,
      value: testOptions[2],
    };
    const reactSelectProps = _.pick(
      select.find(ReactSelect).props(),
      Object.keys(expectedPropValues)
    );
    assert.deepEqual(reactSelectProps, expectedPropValues);
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

  it("sets disabled on the react select element if specified", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        disabled
        options={[]}
      />
    );
    const reactSelect = select.find(ReactSelect);
    assert(reactSelect.prop("disabled"));
  });

  it("sets clearable on the react select element if specified", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        clearable
        options={[]}
      />
    );
    const reactSelect = select.find(ReactSelect);
    assert(reactSelect.prop("clearable"));
  });

  it("sets searchable on the react select element if specified", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        searchable
        options={[]}
      />
    );
    const reactSelect = select.find(ReactSelect);
    assert(reactSelect.prop("searchable"));
  });

  it("defaults to an empty string placeholder ReactSelect", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        options={[]}
      />
    );
    const reactSelect = select.find(ReactSelect);
    assert.equal(reactSelect.prop("placeholder"), "");
  });

  it("renders the required label if specified", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        required
        options={[]}
      />
    );
    assert(select.find("Select--required"));
  });

  it("uses the ReactSelect Creatable component to allow creating custom options if creatable prop is true", () => {
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        creatable
        options={[]}
      />
    );
    const creatable = select.find(ReactSelect.Creatable);
    assert(creatable.exists());
    assert.equal(creatable.prop("name"), "testname");
  });

  it("passes through creatablePromptFn to the ReactSelect Creatable component to allow customizing prompt text for new options", () => {
    const promptFn = label => `Add ${label}`;
    const select = shallow(
      <Select
        id="testid"
        name="testname"
        creatable
        creatablePromptFn={promptFn}
        options={[]}
      />
    );
    const creatable = select.find(ReactSelect.Creatable);
    assert(creatable.exists());
    assert.equal(creatable.prop("promptTextCreator"), promptFn);
  });
});
