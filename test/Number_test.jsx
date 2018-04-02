import assert from "assert";
import React from "react";
import {mount} from "enzyme";

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
    assert.throws(() => mount(<Number>nope</Number>));
    assert.throws(() => Number.format("nope", true));
  });
});
