import * as _ from "lodash";
import * as assert from "assert";
import * as React from "react";
import { shallow } from "enzyme";
import { AlertBox } from "../src";

describe("AlertBox", () => {
  _.forEach(["warning", "info", "error", "success"], type => {
    it(`renders a <AlertBox> element with class AlertBox--${type}`, () => {
      const alertBox = shallow(
        <AlertBox type={type} title="title">
          <p> child </p>
        </AlertBox>,
      );
      assert.equal(alertBox.find(`.AlertBox--${type}`).length, 1);
    });
  });

  it("renders a closable box if isClosable and closes on click", () => {
    const alertBox = shallow(
      <AlertBox type="warning" title="title" isClosable>
        <p> child </p>
      </AlertBox>,
    );
    assert.equal(alertBox.find(".AlertBox--warning").length, 1);
    alertBox.find(".AlertBox--close").simulate("click");
    assert.equal(alertBox.find(".AlertBox--warning").length, 0);
  });

  it("applies custom classname", () => {
    const alertBox = shallow(
      <AlertBox type="warning" title="title" className="custom">
        <p> child </p>
      </AlertBox>,
    );
    assert.equal(alertBox.find(".custom").length, 1);
  });
});
