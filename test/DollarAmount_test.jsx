import assert from "assert";
import React from "react";
import {shallow} from "enzyme";

import DollarAmount from "../src/DollarAmount";


describe("DollarAmount", () => {
  it("handles small integer amounts", () => {
    assert.equal("$24", shallow(<DollarAmount>{24}</DollarAmount>).text());
    assert.equal("$678", shallow(<DollarAmount>{678}</DollarAmount>).text());
  });

  it("handles larger interger amounts", () => {
    assert.equal("$5,123", shallow(<DollarAmount>{5123}</DollarAmount>).text());
    assert.equal("$6,789,345", shallow(<DollarAmount>{6789345}</DollarAmount>).text());
  });

  it("handles decimal amounts", () => {
    assert.equal("$5.33", shallow(<DollarAmount>{5.3333333}</DollarAmount>).text());
    assert.equal("$0.33", shallow(<DollarAmount>{1.0 / 3}</DollarAmount>).text());
  });

  it("handles cents appropriately", () => {
    assert.equal("$5", shallow(<DollarAmount>{5}</DollarAmount>).text());
    assert.equal("$5.00", shallow(<DollarAmount alwaysShowCents>{5}</DollarAmount>).text());
    assert.equal("$5.33", shallow(<DollarAmount>{5.3333333}</DollarAmount>).text());
    assert.equal("$5.33", shallow(<DollarAmount alwaysShowCents>{5.3333333}</DollarAmount>).text());
  });

  it("handles zero appropriately", () => {
    assert.equal("$0", shallow(<DollarAmount>{0}</DollarAmount>).text());
    assert.equal("$0.00", shallow(<DollarAmount alwaysShowCents>{0}</DollarAmount>).text());
    assert.equal("Free", shallow(<DollarAmount zeroIsFree>{0}</DollarAmount>).text());
  });

  it("handles string number inputs", () => {
    assert.equal("$5,123", shallow(<DollarAmount>5123</DollarAmount>).text());
    assert.equal("$125.33", shallow(<DollarAmount>125.3333</DollarAmount>).text());
    assert.equal("$0", shallow(<DollarAmount>0</DollarAmount>).text());
  });

  it("supports non-React formatting", () => {
    assert.equal("$5,123", DollarAmount.format(5123));
    assert.equal("$125.33", DollarAmount.format("125.333333"));
    assert.equal("Free", DollarAmount.format(0, true));
  });

  it("throws for non-numeric input", () => {
    assert.throws(() => shallow(<DollarAmount>nope</DollarAmount>));
    assert.throws(() => DollarAmount.format("nope", true));
  });
});
