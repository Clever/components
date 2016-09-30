import assert from "assert";
import React from "react";
import {shallow} from "enzyme";

import Col from "../../src/Grid/Col";
import Size from "../../src/Grid/Size";


describe("Col", () => {
  it("sets all relevant screen-size-specific classes", () => {
    const col = shallow(
      <Col
        span={{
          [Size.DEFAULT]: 12,
          [Size.S]: 6,
          [Size.M]: 4,
          [Size.L]: 3,
        }}
      />
    );

    [
      "Grid--Col--dflt--12",
      "Grid--Col--s--6",
      "Grid--Col--m--4",
      "Grid--Col--l--3",
    ].forEach(className => {
      assert(col.hasClass(className), `${className} class not found on Col.`);
    });
  });

  it("applies custom classname", () => {
    const col = shallow(<Col className="custom" />);
    assert(col.hasClass("custom"), "Custom class name not applied.");
  });

  it("uses custom wrapper component", () => {
    const col = shallow(<Col wrapperComponent="li" />);
    assert.equal(col.type(), "li", "Incorrect wrapper component type.");
  });
});
