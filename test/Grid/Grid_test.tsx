import assert from "assert";
import React from "react";
import { shallow } from "enzyme";

import Row from "../../src/Grid/Row";
import { Grid } from "../../src/Grid/Grid";

describe("Grid", () => {
  it("applies grid classname", () => {
    const grid = shallow(<Grid />);
    assert(grid.hasClass("Grid"), "Grid class name not applied.");
  });

  it("applies custom classname", () => {
    const grid = shallow(<Grid className="custom" />);
    assert(grid.hasClass("custom"), "Custom class name not applied.");
  });

  it("uses custom wrapper component", () => {
    const grid = shallow(<Grid wrapperComponent="ul" />);
    assert.equal(grid.type(), "ul", "Incorrect wrapper component type.");
  });

  it("renders child Rows", () => {
    const rows = [<Row key="0" />, <Row key="1" />];

    const grid = shallow(<Grid>{rows}</Grid>);

    assert(grid.containsAllMatchingElements(rows), "child rows not rendered");
  });
});
