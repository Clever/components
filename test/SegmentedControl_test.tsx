import * as assert from "assert";
import * as React from "react";
import * as sinon from "sinon";
import { shallow } from "enzyme";
import { SegmentedControl } from "../src";

const testOptions = [
  {
    value: "one",
    content: "Option 1",
  },
  {
    value: "two",
    content: "Option 2",
  },
  {
    value: "three",
    content: "Option 3",
  },
  {
    value: "html",
    content: <span>HTML Option</span>,
  },
];
const { cssClass } = SegmentedControl;

describe("SegmentedControl", () => {
  it("renders all selectable items", () => {
    const control = shallow(<SegmentedControl options={testOptions} />);

    const options = control.find(`.${cssClass.OPTION}`);
    assert.equal(
      options.length,
      testOptions.length,
      `Expected ${testOptions.length} options. Found ${options.length}`,
    );

    const selected = control.find(`.${cssClass.SELECTED}`);
    assert(!selected.exists(), "There should not be any initially selected items.");

    testOptions.forEach(({ content }, i) => {
      assert(
        options.at(i).contains(content),
        `Expected option ${i} to contain ${content}; found ${options.at(i).text()}`,
      );
    });
  });

  it("initalizes selected when defaultValue is set", () => {
    const expected = testOptions[2];
    const control = shallow(
      <SegmentedControl options={testOptions} defaultValue={expected.value} />,
    );

    const selected = control.find(`.${cssClass.SELECTED}`);
    assert.equal(selected.length, 1, `Expected 1 selected item. Found ${selected.length}.`);
    assert(
      selected.contains(expected.content),
      `Expected selected to contain "${expected.content}"; found "${selected.first().text()}"`,
    );
  });

  it("sets selected class on click", () => {
    const control = shallow(<SegmentedControl options={testOptions} />);

    const options = control.find(`.${cssClass.OPTION}`);
    options.forEach(option => {
      option.simulate("click");

      const selected = control.find(`.${cssClass.SELECTED}`);
      assert.equal(selected.length, 1, `Expected 1 selected item. Found ${selected.length}.`);

      assert(
        selected.contains(option.text()),
        `Expected "${option.text()}" to be selected. Found "${selected.first().text()}"`,
      );
    });
  });

  it("calls onSelect function when items are selected", () => {
    const stub = sinon.stub();
    const control = shallow(<SegmentedControl options={testOptions} onSelect={stub} />);

    const options = control.find(`.${cssClass.OPTION}`);
    options.forEach((option, i) => {
      option.simulate("click");
      sinon.assert.calledWith(stub, testOptions[i].value);
    });
  });

  it("prioritizes the `value` prop when determining the selected option", () => {
    const onSelect = sinon.stub();
    const controlledValue = testOptions[1];

    const control = shallow(
      <SegmentedControl options={testOptions} onSelect={onSelect} value={controlledValue.value} />,
    );

    assert.equal(control.instance().getValue(), controlledValue.value);

    const options = control.find(`.${cssClass.OPTION}`);
    options.forEach((option, i) => {
      onSelect.reset();

      option.simulate("click");

      if (option.props().children === controlledValue.content) {
        // We don't expect the onSelect event to fire if the value is unchanged.
        sinon.assert.notCalled(onSelect);
      } else {
        sinon.assert.calledWith(onSelect, testOptions[i].value);
      }

      assert(options.at(1).hasClass(cssClass.SELECTED), "Option at index 1 should remain selected");
    });
  });

  it("throws error on conflicting controlled/uncontrolled mode", () => {
    assert.throws(
      () => shallow(<SegmentedControl defaultValue="one" options={testOptions} value="two" />),
      /controlled or uncontrolled/,
    );
  });

  it("throws error on missing `onSelect` prop in controlled mode", () => {
    assert.throws(
      () => shallow(<SegmentedControl options={testOptions} value="two" />),
      /`onSelect` prop required/,
    );
  });

  it("disables selection on all options if control is disabled", () => {
    const stub = sinon.stub();
    const control = shallow(<SegmentedControl disabled options={testOptions} onSelect={stub} />);

    const options = control.find(`.${cssClass.OPTION}`);
    options.forEach(option => {
      option.simulate("click");

      const selected = control.find(`.${cssClass.SELECTED}`);
      assert(!selected.exists(), "Expected no selected items after click.");
      sinon.assert.notCalled(stub);
    });
  });

  it("disables selection on individually disabled options", () => {
    const controlOptions = [
      {
        value: "enabled",
        content: "Enabled Option",
      },
      {
        value: "disabled",
        content: "Disabled Option",
        disabled: true,
      },
    ];
    const stub = sinon.stub();
    const control = shallow(<SegmentedControl options={controlOptions} onSelect={stub} />);
    const options = control.find(`.${cssClass.OPTION}`);

    options.at(0).simulate("click");
    let selected = control.find(`.${cssClass.SELECTED}`);
    assert(
      selected.contains(options.at(0).text()),
      `Expected "${options.at(0).text()}" to be selected. Found "${selected.first().text()}"`,
    );
    sinon.assert.calledWith(stub, controlOptions[0].value);

    stub.reset();

    options.at(1).simulate("click");
    selected = control.find(`.${cssClass.SELECTED}`);
    assert(
      selected.contains(options.at(0).text()),
      `Expected "${options.at(0).text()}" to be selected. Found "${selected.first().text()}"`,
    );
    sinon.assert.notCalled(stub);
  });
});
