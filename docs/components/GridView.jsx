import _ from "lodash";
import classnames from "classnames";
import React, {PureComponent} from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
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
        <p>
          12-column grid component for consistent, simple and flexible layouts.
        </p>
        <p>
          The <code>Grid</code> is a single column of any number of <code>Grid.Rows</code>, which contain
          any number of <code>Grid.Cols</code>.
        </p>
        <p>
          <code>Grid.Cols</code> can have varying sizes, determined by the values of their span prop. A
          single <code>Grid.Col</code> can have different span lengths for different viewport sizes to
          enable layouts that update dynamically based on available space in the viewport.
        </p>
        <p>
          <strong>NOTE:</strong> A row of <code>Grid.Cols</code> is guaranteed to fit on a single line only
          if the sum of the spans add up to 12 in the current viewport. Any additional <code>Grid.Cols</code>
          will wrap onto the following line.
        </p>

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

        <PropDocumentation
          availableProps={[
            {
              name: "children",
              type: "Array<Grid.Row>",
              description: "The rows to render in the grid",
              optional: true,
            },
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the grid",
              optional: true,
            },
            {
              name: "wrapperComponent",
              type: "Any",
              description: "The tagname or component class for the wrapper component to render for the grid",
              defaultValue: "div",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="Grid"
        />

        <PropDocumentation
          availableProps={[
            {
              name: "children",
              type: "Array<Grid.Col>",
              description: "The columns to render in the row",
              optional: true,
            },
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the row",
              optional: true,
            },
            {
              name: "grow",
              type: "Boolean",
              description: "Fluidly grow the row to fill any available verical space. The parent Grid should have an"
              + " have an explicit height set for this to work.",
              defaultValue: "div",
              optional: true,
            },
            {
              name: "wrapperComponent",
              type: "Any",
              description: "The tagname or component class for the wrapper component to render for the row",
              defaultValue: "div",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="Grid.Row"
        />

        <PropDocumentation
          availableProps={[
            {
              name: "children",
              type: "React Node",
              description: "The content to render in the column",
              optional: true,
            },
            {
              name: "className",
              type: "String",
              description: "Additional classname to apply to the column",
              optional: true,
            },
            {
              name: "span",
              type: "Number or Map<Grid.Size,Number>",
              description: "The number of columns (1-12) that this column spans. Can optionally as a map of viewport "
              + "size to column span in order to dynamically update the grid based on the user's viewport width.",
              defaultValue: "1",
              optional: true,
            },
            {
              name: "wrapperComponent",
              type: "Any",
              description: "The tagname or component class for the wrapper component to render for the column",
              defaultValue: "div",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
          title="Grid.Col"
        />
      </View>
    );
  }
}

GridView.cssClass = {
  CONTAINER: "GridView",
};
