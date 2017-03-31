/* eslint func-names: "off" */

import assert from "assert";
import React from "react";
import sinon from "sinon";
import {mount} from "enzyme";

import DatePicker from "../src/DatePicker";

describe("DatePicker", () => {
  it("renders a title and datepicker", () => {
    const datePicker = mount(
      <DatePicker title="Pick a date" onClose={() => {}} />
    );
    const container = datePicker.find("div.DatePicker");
    const title = datePicker.find("span.DatePicker--title");
    const picker = datePicker.find("div.react-datepicker");

    assert.equal(container.length, 1);
    assert.equal(title.text(), "Pick a date");
    assert.equal(picker.length, 1);
  });

  it("calls onClose when the close button is clicked", () => {
    const stub = sinon.stub();
    const datePicker = mount(
      <DatePicker title="Pick a date" onClose={stub} />
    );
    const closeButton = datePicker.find(".DatePicker--close");
    closeButton.simulate("click");
    assert(stub.calledOnce);
  });
  it("calls onChange when a date is clicked", () => {
    const stub = sinon.stub();
    const datePicker = mount(
      <DatePicker title="Pick a date" onClose={() => {}} onChange={stub} />
    );
    const dates = datePicker.find(".react-datepicker__day");
    assert(dates.length > 0);
    dates.at(0).simulate("click");
    assert(stub.calledOnce);
  });
});
