import _ from "lodash";
import classnames from "classnames";
import React, {PureComponent} from "react";

import Example from "./Example";
import View from "./View";
import {Grid} from "src";

import "./GridView.less";


export default class GridView extends PureComponent {
  renderCol(spans, className) {
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

  render() {
    const {Col, Row, Size} = Grid;
    const {cssClass} = GridView;

    return (
      <View className={cssClass.CONTAINER} title="Grid" subtitle="Flexible, 12-Column Grid Layout">
        <Example
          title="Single Layout"
          code={`
            // TODO
          `}
        >
          <Grid className="outlined resizable">
            <Row grow>{this.renderCol(2)}{this.renderCol(7)}{this.renderCol(3)}</Row>
            <Row grow>
              {this.renderCol(2)}{this.renderCol(2)}{this.renderCol(5)}{this.renderCol(3)}
            </Row>
            <Row grow>{this.renderCol(12)}</Row>
          </Grid>
        </Example>

        <Example
          title="Single Layout (with gutters)"
          code={`
            // TODO
          `}
        >
          <Grid className="outlined resizable">
            <Row className="margin--bottom--xs" grow>
              {this.renderCol(2, "padding--right--xs")}
              {this.renderCol(7, "padding--right--xs")}
              {this.renderCol(3)}
            </Row>
            <Row className="margin--bottom--xs" grow>
              {this.renderCol(2, "padding--right--xs")}
              {this.renderCol(2, "padding--right--xs")}
              {this.renderCol(5, "padding--right--xs")}
              {this.renderCol(3)}
            </Row>
            <Row>{this.renderCol(12)}</Row>
          </Grid>
        </Example>

        <Example
          title="Mixed Layouts"
          code={`
            // TODO
          `}
        >
          <Grid className="outlined resizable">
            <Row grow>
              {this.renderCol({
                [Size.DEFAULT]: 12,
                [Size.S]: 6,
                [Size.M]: 4,
                [Size.L]: 3,
              })}
              {this.renderCol({
                [Size.DEFAULT]: 12,
                [Size.S]: 6,
                [Size.M]: 4,
                [Size.L]: 3,
              })}
              {this.renderCol({
                [Size.DEFAULT]: 12,
                [Size.S]: 6,
                [Size.M]: 4,
                [Size.L]: 3,
              })}
              {this.renderCol({
                [Size.DEFAULT]: 12,
                [Size.S]: 6,
                [Size.M]: 12,
                [Size.L]: 3,
              })}
            </Row>
            <Row grow>{this.renderCol(6)}{this.renderCol(6)}</Row>
            <Row>{this.renderCol(12)}</Row>
          </Grid>
        </Example>

        <Example
          title="Nested Grids"
          code={`
            // TODO
          `}
        >
          <Grid className="items--center outlined resizable" style={{height: "400px", minWidth: "550px"}}>
            <Row className="shaded outlined" style={{marginBottom: "1rem"}}>
              <Col span={12} className="flexbox justify--center">
                <Grid style={{padding: 0, maxWidth: "700px"}}>
                  <Row>{this.renderCol(2)}{this.renderCol(7)}{this.renderCol(3)}</Row>
                </Grid>
              </Col>
            </Row>
            <Row className="shaded outlined" grow>
              <Col span={12} className="flexbox justify--center self--stretch">
                <Grid style={{padding: 0, maxWidth: "700px"}} className="self--stretch">
                  <Row>{this.renderCol(3)}{this.renderCol(9)}</Row>
                  <Row grow>{this.renderCol(3, "flexbox")}{this.renderCol(9, "flexbox")}</Row>
                  <Row>{this.renderCol(12)}</Row>
                </Grid>
              </Col>
            </Row>
          </Grid>
        </Example>

        <Example
          title="Standalone Row"
          code={`
            // TODO
          `}
        >
          <Row>
            {this.renderCol(3, "padding--right--xs")}
            {this.renderCol(3, "padding--right--xs")}
            {this.renderCol(3, "padding--right--xs")}
            {this.renderCol(3)}
          </Row>
        </Example>
      </View>
    );
  }
}

GridView.cssClass = {
  CONTAINER: "GridView",
};
