import assert from "assert";
import React from "react";
import sinon from "sinon";
import {shallow} from "enzyme";
import {SegmentedControl} from "../src";

const testOptions = {one: "Option 1", two: "Option 2", three: "Option 3"};

describe("SegmentedControl", () => {
  it("renders all selectable items", () => {
    const control = shallow(<SegmentedControl selectableItems={testOptions} />);
    const selectableItems = control.find(".segmented_control--selectable-item");
    assert.equal(selectableItems.length, 3, "there should be three selectable items");
    const selected = control.find(".selected");
    assert.equal(selected.length, 0, "there should not be any initially selected items");
    assert.equal(selectableItems.at(0).text(), "Option 1");
    assert.equal(selectableItems.at(1).text(), "Option 2");
    assert.equal(selectableItems.at(2).text(), "Option 3");
  });

  it("initalizes selected when set", () => {
    const control = shallow(<SegmentedControl selectableItems={testOptions} defaultValue="three" />);
    const selectableItems = control.find(".segmented_control--selectable-item");
    assert.equal(selectableItems.length, 3, "there should be three selectable items");
    const selected = control.find(".selected");
    assert.equal(selected.length, 1, "there should not be any initially selected items");
    assert.equal(selected.first().text(), "Option 3", "the right element should be selected");
  });

  it("sets selected class on click", () => {
    const control = shallow(<SegmentedControl selectableItems={testOptions} />);
    let selectableItems = control.find(".segmented_control--selectable-item");
    assert.ifError(selectableItems.at(0).hasClass("selected"));
    assert.ifError(selectableItems.at(1).hasClass("selected"));
    assert.ifError(selectableItems.at(2).hasClass("selected"));

    selectableItems.at(0).simulate("click", {target: {getAttribute: () => "one"}});
    selectableItems = control.find(".segmented_control--selectable-item");
    assert(selectableItems.at(0).hasClass("selected"));
    assert.ifError(selectableItems.at(1).hasClass("selected"));
    assert.ifError(selectableItems.at(2).hasClass("selected"));

    selectableItems.at(2).simulate("click", {target: {getAttribute: () => "three"}});
    selectableItems = control.find(".segmented_control--selectable-item");
    assert.ifError(selectableItems.at(0).hasClass("selected"));
    assert.ifError(selectableItems.at(1).hasClass("selected"));
    assert(selectableItems.at(2).hasClass("selected"));
  });

  it("calls onSelect function when items are selected", () => {
    const stub = sinon.stub();
    const control = shallow(<SegmentedControl selectableItems={testOptions} onSelect={stub} />);
    const selectableItems = control.find(".segmented_control--selectable-item");

    selectableItems.at(0).simulate("click", {target: {getAttribute: () => "one"}});
    assert(stub.calledOnce);
    assert.equal(stub.getCall(0).args.length, 1);
    assert.equal(stub.getCall(0).args[0], "one");

    selectableItems.at(2).simulate("click", {target: {getAttribute: () => "three"}});
    assert(stub.calledTwice);
    assert.equal(stub.getCall(1).args.length, 1);
    assert.equal(stub.getCall(1).args[0], "three");
  });
});
