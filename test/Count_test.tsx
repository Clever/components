import * as assert from "assert";
import * as React from "react";
import { shallow } from "enzyme";

import Count from "../src/Count";

describe("Count", () => {
  it("renders singular form for 1", () => {
    assert.equal(
      "1 bee. 😐",
      shallow(
        <Count plural="bees! 😱" singular="bee. 😐">
          1
        </Count>,
      ).text(),
    );
  });

  it("renders plural form for > 1", () => {
    assert.equal(
      "5,123 bees! 😱",
      shallow(
        <Count plural="bees! 😱" singular="bee. 😐">
          {5123}
        </Count>,
      ).text(),
    );

    assert.equal(
      "5.1K bees! 😱",
      shallow(
        <Count short plural="bees! 😱" singular="bee. 😐">
          5123
        </Count>,
      ).text(),
    );
  });

  it("renders default plural form if not specified", () => {
    assert.equal("5,123 bees", shallow(<Count singular="bee">{5123}</Count>).text());
  });

  it("renders plural form for 0", () => {
    assert.equal("0 bees", shallow(<Count singular="bee">{0}</Count>).text());
  });

  it("renders zero override for 0 when specified", () => {
    assert.equal(
      "🚫😌",
      shallow(
        <Count plural="bees! 😱" singular="bee. 😐" zeroOverride="🚫😌">
          0
        </Count>,
      ).text(),
    );
  });

  it("supports non-React formatting", () => {
    assert.equal(
      "1,500 bees! 😱",
      Count.format({
        number: 1500,
        plural: "bees! 😱",
        singular: "bee. 😐",
      }),
    );

    assert.equal(
      "🚫😌",
      Count.format({
        number: 0,
        singular: "bee",
        zeroOverride: "🚫😌",
      }),
    );
  });
});
