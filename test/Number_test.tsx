import * as assert from "assert";
import * as React from "react";
import { mount, shallow } from "enzyme";

import Number from "../src/Number";

describe("Number", () => {
  it("leaves short numbers unchanged", () => {
    assert.equal("500", mount(<Number>{500}</Number>).text());
    assert.equal("678", mount(<Number short>{678}</Number>).text());
  });

  it("formats long numbers", () => {
    assert.equal("5,123", mount(<Number>{5123}</Number>).text());
    assert.equal("6,789,345", mount(<Number>{6789345}</Number>).text());
  });

  it("shortens long numbers when 'short' prop is specified", () => {
    assert.equal("5.1K", mount(<Number short>{5123}</Number>).text());
    assert.equal("6.8M", mount(<Number short>{6789345}</Number>).text());
  });

  it("handles string number inputs", () => {
    assert.equal("5,123", mount(<Number>5123</Number>).text());
    assert.equal("6.8M", mount(<Number short>6789345</Number>).text());
  });

  it("supports non-React formatting", () => {
    assert.equal("5,123", Number.format(5123));
    assert.equal("6.8M", Number.format("6789345", true));
  });

  it("throws for non-numeric input", () => {
    // shallow render to avoid a console warning due to the new error handling of mounted components in react 16.
    assert.throws(() => shallow(<Number>nope</Number>));
    assert.throws(() => Number.format("nope", true));
  });

  it.only("renders 0 when children is falsy", () => {
    assert.equal("0", mount(<Number />).text());
    assert.equal("0", mount(<Number>{}</Number>).text());
    assert.equal("0", mount(<Number>{""}</Number>).text());
    assert.equal("0", mount(<Number>0</Number>).text());
    assert.equal("0", mount(<Number>{null}</Number>).text());
    assert.equal("0", mount(<Number>{undefined}</Number>).text());
  });
});
