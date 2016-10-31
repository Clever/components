import _ from "lodash";
import classnames from "classnames";
import React from "react";

import {Grid} from "../src/Grid/Grid";

require("./GridExample.less");
require("../src/less/flex.less");
require("../src/less/spacing.less");


function renderCol(spans, className) {
  const {Col, Size} = Grid;
  let content;
  if (typeof spans === "number") {
    content = `${Size.DEFAULT}: ${spans}`;
  } else {
    content = _.map(spans, (span, gridSize) => `${gridSize}: ${span}`).join("\n");
  }

  return (
    <Col className={classnames("gridCell", className)} span={spans}>
      <code className="gridContent">
        <pre className="margin--none">{content}</pre>
      </code>
    </Col>
  );
}

export default function GridExample() {
  const {Col, Row, Size} = Grid;

  return (
    <div className="GridExample">
      <a name="grid">
        <h1>Grid (12-Column)</h1>
      </a>
      <h2>Single Layout</h2>
      <Grid className="outlined resizable">
        <Row grow>{renderCol(2)}{renderCol(7)}{renderCol(3)}</Row>
        <Row grow>{renderCol(2)}{renderCol(2)}{renderCol(5)}{renderCol(3)}</Row>
        <Row grow>{renderCol(12)}</Row>
      </Grid>

      <h2>Single Layout (with gutters)</h2>
      <Grid className="outlined resizable">
        <Row className="margin--bottom--xs" grow>
          {renderCol(2, "padding--right--xs")}
          {renderCol(7, "padding--right--xs")}
          {renderCol(3)}
        </Row>
        <Row className="margin--bottom--xs" grow>
          {renderCol(2, "padding--right--xs")}
          {renderCol(2, "padding--right--xs")}
          {renderCol(5, "padding--right--xs")}
          {renderCol(3)}
        </Row>
        <Row>{renderCol(12)}</Row>
      </Grid>

      <h2>Mixed Layouts</h2>
      <Grid className="outlined resizable">
        <Row grow>
          {renderCol({
            [Size.DEFAULT]: 12,
            [Size.S]: 6,
            [Size.M]: 4,
            [Size.L]: 3,
          })}
          {renderCol({
            [Size.DEFAULT]: 12,
            [Size.S]: 6,
            [Size.M]: 4,
            [Size.L]: 3,
          })}
          {renderCol({
            [Size.DEFAULT]: 12,
            [Size.S]: 6,
            [Size.M]: 4,
            [Size.L]: 3,
          })}
          {renderCol({
            [Size.DEFAULT]: 12,
            [Size.S]: 6,
            [Size.M]: 12,
            [Size.L]: 3,
          })}
        </Row>
        <Row grow>{renderCol(6)}{renderCol(6)}</Row>
        <Row>{renderCol(12)}</Row>
      </Grid>

      <h2>Nested Grids</h2>
      <Grid className="items--center outlined resizable" style={{height: "400px", minWidth: "550px"}}>
        <Row className="shaded outlined" style={{marginBottom: "1rem"}}>
          <Col span={12} className="flexbox justify--center">
            <Grid style={{padding: 0, maxWidth: "700px"}}>
              <Row>{renderCol(2)}{renderCol(7)}{renderCol(3)}</Row>
            </Grid>
          </Col>
        </Row>
        <Row className="shaded outlined" grow>
          <Col span={12} className="flexbox justify--center self--stretch">
            <Grid style={{padding: 0, maxWidth: "700px"}} className="self--stretch">
              <Row>{renderCol(3)}{renderCol(9)}</Row>
              <Row grow>{renderCol(3, "flexbox")}{renderCol(9, "flexbox")}</Row>
              <Row>{renderCol(12)}</Row>
            </Grid>
          </Col>
        </Row>
      </Grid>

      <h2>Standalone Row</h2>
      <Row>
        {renderCol(3, "padding--right--xs")}
        {renderCol(3, "padding--right--xs")}
        {renderCol(3, "padding--right--xs")}
        {renderCol(3)}
      </Row>
    </div>
  );
}
