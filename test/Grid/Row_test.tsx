import * as assert from "assert";
import * as React from "react";
import { shallow } from "enzyme";

import Col from "../../src/Grid/Col";
import Row from "../../src/Grid/Row";

describe("Row", () => {
  it("applies Row classname", () => {
    const row = shallow(<Row />);
    assert(row.hasClass("Grid--Row"), "Row class name not applied.");
  });

  it("applies custom classname", () => {
    const row = shallow(<Row className="custom" />);
    assert(row.hasClass("custom"), "Custom class name not applied.");
  });

  it("uses custom wrapper component", () => {
    const row = shallow(<Row wrapperComponent="ul" />);
    assert.equal(row.type(), "ul", "Incorrect wrapper component type.");
  });

  it("sets flex-grow factor if `grow` prop is specified", () => {
    const row = shallow(<Row grow />);
    assert(row.hasClass("flex--grow"), "`flex--grow` class not found on row.");
  });

  it("renders child Cols", () => {
    const cols = [<Col key="0" />, <Col key="1" />];

    const grid = shallow(<Row>{cols}</Row>);

    assert(grid.containsAllMatchingElements(cols), "child columns not rendered");
  });
});
