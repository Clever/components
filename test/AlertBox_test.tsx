import * as _ from "lodash";
import * as assert from "assert";
import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { AlertBox } from "../src";

afterEach(cleanup);

describe("AlertBox", () => {
  _.forEach(["warning", "info", "error", "success"], type => {
    it(`renders a <AlertBox> element with class AlertBox--${type}`, () => {
      const { getByTestId } = render(
        <AlertBox type={type as any} title="title">
          <p> child </p>
        </AlertBox>,
      );
      assert.ok(getByTestId("AlertBoxType").classList.contains(`AlertBox--${type}`));
    });
  });

  it("renders a closable box if isClosable and closes on click", () => {
    const { getByLabelText, container } = render(
      <AlertBox type="warning" title="title" isClosable>
        <p> child </p>
      </AlertBox>,
    );
    assert.ok(container.firstChild);
    getByLabelText("Close").click();
    assert.ok(container.firstChild == null);
  });

  it("applies custom classname", () => {
    const { container } = render(
      <AlertBox type="warning" title="title" className="custom">
        <p> child </p>
      </AlertBox>,
    );
    assert.ok(container.firstChild && container.firstChild.classList.contains("custom"));
  });
});
