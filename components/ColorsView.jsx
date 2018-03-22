import React, {PureComponent} from "react";

import Colors from "src/utils/Colors";
import Example from "./Example";
import View from "./View";
import {Grid} from "src";

import "./ColorsView.less";

export default class ColorsView extends PureComponent {
  render() {
    const {cssClass} = ColorsView;
    const {Col, Row} = Grid;
    return (
      <View className={cssClass.CONTAINER} title="Colors">
        <Grid>
          <Row grow className="margin--bottom--5xl padding--right--m">
            <Col span={6} className="flexbox self--start padding--right--l">
              <div>
                <h2>Primary Color</h2>
                <p>
                  This tone and shade of blue reflects the bold and inspirational nature of the Clever vision. It
                  was also inspired by the bright colors used in many of today’s classrooms.
                </p>
              </div>
            </Col>
            <Col span={5} className="flexbox flex--wrap">
              <Row grow className="flex--direction--row">
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--primary_blue--shade-2">
                    <h4 className="text--vertical">Shade 2</h4>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--primary_blue--shade-1">
                    <h4 className="text--vertical">Shade 1</h4>
                  </div>
                </Col>
                <Col span={8} className="flexbox">
                  <div className="color--block large--color--block bg--primary_blue">
                    <h2 className="">Primary Blue</h2>
                    <p>@primary_blue</p>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--primary_blue--tint-1">
                    <h4 className="text--vertical">Tint 1</h4>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--primary_blue--tint-2">
                    <h4 className="text--vertical">Tint 2</h4>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row grow className="margin--bottom--5xl">
            <Col span={6} className="flexbox self--start padding--right--l">
              <div>
                <h2>Neutral Colors</h2>
                <p>
                  To support the Clever Blue, these neutral colors have been chosen to add contrast and hierarchy
                  for borders, backgrounds, and text styles.
                </p>
              </div>
            </Col>
            <Col span={5} className="flexbox">
              <Row grow className="">
                <Col span={4} className="flexbox margin--bottom--l">
                  <div className="color--block bg--neutral_black">
                    <h4 className="">@neutral_black</h4>
                  </div>
                </Col>
                <Col span={4} className="flexbox margin--bottom--l">
                  <div className="color--block bg--neutral_dark_gray">
                    <h4 className="">@neutral_dark_gray</h4>
                  </div>
                </Col>
                <Col span={4} className="flexbox margin--bottom--l">
                  <div className="color--block bg--neutral_gray">
                    <h4 className="">@neutral_gray</h4>
                  </div>
                </Col>
                <Col span={4} className="flexbox margin--bottom--l">
                  <div className="color--block bg--neutral_silver">
                    <h4 className="">@neutral_silver</h4>
                  </div>
                </Col>
                <Col span={4} className="flexbox margin--bottom--l">
                  <div className="color--block bg--neutral_off_white">
                    <h4 className="">@neutral_off_white</h4>
                  </div>
                </Col>
                <Col span={4} className="flexbox margin--bottom--l">
                  <div className="color--block bg--neutral_white">
                    <h4 className="">@neutral_white</h4>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row grow className="margin--bottom--5xl">
            <Col span={6} className="flexbox self--start padding--right--l">
              <div>
                <h2>Alert Colors</h2>
                <p>
                  To support the Clever Blue, these neutral colors have been chosen to add contrast and hierarchy
                  for borders, backgrounds, and text styles.
                </p>
              </div>
            </Col>
            <Col span={5} className="flexbox flex--wrap">
              <Row grow className="flex--direction--row margin--bottom--l">
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--shade-2">
                    <h4 className="text--vertical">Shade 2</h4>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--shade-1">
                    <h4 className="text--vertical">Shade 1</h4>
                  </div>
                </Col>
                <Col span={8} className="flexbox">
                  <div className="color--block large--color--block bg--alert_green">
                    <h2 className="">Alert Green</h2>
                    <p>@alert_green</p>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--tint-1">
                    <h4 className="text--vertical">Tint 1</h4>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--tint-2">
                    <h4 className="text--vertical">Tint 2</h4>
                  </div>
                </Col>
              </Row>
              <Row grow className="flex--direction--row margin--bottom--l">
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--alert_red--shade-2">
                    <h4 className="text--vertical">Shade 2</h4>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--alert_red--shade-1">
                    <h4 className="text--vertical">Shade 1</h4>
                  </div>
                </Col>
                <Col span={8} className="flexbox">
                  <div className="color--block large--color--block bg--alert_red">
                    <h2 className="">Alert Red</h2>
                    <p>@alert_red</p>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--alert_red--tint-1">
                    <h4 className="text--vertical">Tint 1</h4>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--alert_red--tint-2">
                    <h4 className="text--vertical">Tint 2</h4>
                  </div>
                </Col>
              </Row>
              <Row grow className="flex--direction--row margin--bottom--l">
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--alert_orange--shade-2">
                    <h4 className="text--vertical">Shade 2</h4>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--alert_orange--shade-1">
                    <h4 className="text--vertical">Shade 1</h4>
                  </div>
                </Col>
                <Col span={8} className="flexbox">
                  <div className="color--block large--color--block bg--alert_orange">
                    <h2 className="">Alert Orange</h2>
                    <p>@alert_orange</p>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--alert_orange--tint-1">
                    <h4 className="text--vertical">Tint 1</h4>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--alert_orange--tint-2">
                    <h4 className="text--vertical">Tint 2</h4>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row grow className="margin--bottom--5xl">
            <Col span={6} className="flexbox self--start padding--right--l">
              <div>
                <h2>Accent Colors</h2>
                <p>
                  To support the Clever Blue, these neutral colors have been chosen to add contrast and hierarchy
                  for borders, backgrounds, and text styles.
                </p>
              </div>
            </Col>
            <Col span={5} className="flexbox flex--wrap">
              <Row grow className="flex--direction--row margin--bottom--l">
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--accent_teal--shade-2">
                    <h4 className="text--vertical">Shade 2</h4>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--accent_teal--shade-1">
                    <h4 className="text--vertical">Shade 1</h4>
                  </div>
                </Col>
                <Col span={8} className="flexbox">
                  <div className="color--block large--color--block bg--accent_teal">
                    <h2 className="">Accent Teal</h2>
                    <p>@accent_teal</p>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--accent_teal--tint-1">
                    <h4 className="text--vertical">Tint 1</h4>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--accent_teal--tint-2">
                    <h4 className="text--vertical">Tint 2</h4>
                  </div>
                </Col>
              </Row>
              <Row grow className="flex--direction--row margin--bottom--l">
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--accent_pink--shade-2">
                    <h4 className="text--vertical">Shade 2</h4>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--accent_pink--shade-1">
                    <h4 className="text--vertical">Shade 1</h4>
                  </div>
                </Col>
                <Col span={8} className="flexbox">
                  <div className="color--block large--color--block bg--accent_pink">
                    <h2 className="">Accent Pink</h2>
                    <p>@accent_pink</p>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--accent_pink--tint-1">
                    <h4 className="text--vertical">Tint 1</h4>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--accent_pink--tint-2">
                    <h4 className="text--vertical">Tint 2</h4>
                  </div>
                </Col>
              </Row>
              <Row grow className="flex--direction--row margin--bottom--l">
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--accent_purple--shade-2">
                    <h4 className="text--vertical">Shade 2</h4>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--accent_purple--shade-1">
                    <h4 className="text--vertical">Shade 1</h4>
                  </div>
                </Col>
                <Col span={8} className="flexbox">
                  <div className="color--block large--color--block bg--accent_purple">
                    <h2 className="">Accent Purple</h2>
                    <p>@accent_purple</p>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--accent_purple--tint-1">
                    <h4 className="text--vertical">Tint 1</h4>
                  </div>
                </Col>
                <Col span={1} className="flexbox">
                  <div className="color--block step--color--block bg--accent_purple--tint-2">
                    <h4 className="text--vertical">Tint 2</h4>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row grow className="margin--bottom--5xl padding--right--m">
            <Col span={6} className="flexbox self--start padding--right--l">
              <div>
                <h2>Color usage</h2>
                <p>
                  Whenever you declare a color in LESS, you should reference the color variable instead of
                  declaring a fixed value. If you need to use a tinted or shaded variation of a color, use
                  only the declared tints or shades.
                </p>
                <strong>Tint and shade usage</strong>
                <p>
                  Each color variable has two defined tints and shades that can be used.
                </p>
                <code>color: @primary_blue_tint_2;</code>
              </div>
            </Col>
            <Col span={4} className="flexbox">
              <Example
                title="LESS Example"
                code={`
                  <span className="callout--box">This is a blue bordered box.</span>

                  <style>
                    .callout--box {
                      border: @size_3xs solid @primary_blue_tint_2;
                      background-color: @neutral_off_white;
                      height: 3rem;

                      &:hover {
                        border-color: @primary_blue_shade_2;
                      }
                    }
                  </style>
                `}
              >
                <span className="callout--box">This is a blue bordered box.</span>
              </Example>
            </Col>
          </Row>
          <Row grow className="margin--bottom--5xl padding--right--m">
            <Col span={6} className="flexbox self--start padding--right--l">
              <div>
                <h2>JS Color Variables</h2>
                <p>
                  In some cases, you may need to specify colors in JS. e.g. When using a third-party
                  library that doesn't enable styling via CSS.
                </p>
                <p>
                  There are pre-defined JS color variables available for this reason:
                </p>
                <code>import Colors from "clever-components/dist/utils/Colors";</code>
              </div>
            </Col>
            <Col span={4} className="flexbox">
              <Example
                title="JS Example"
                code={`
                  import Colors from "clever-components/dist/utils/Colors";
                  import Circle from "third-party-library";

                  <Circle
                    borderColor={Colors.NEUTRAL_GRAY}
                    fillColor={Colors.NEUTRAL_SILVER}
                  />
                `}
              >
                <svg viewBox="0 0 20 12">
                  <circle
                    cx={10}
                    cy={6}
                    r={5}
                    fill={Colors.NEUTRAL_SILVER}
                    stroke={Colors.NEUTRAL_GRAY}
                  />
                </svg>
              </Example>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}

ColorsView.cssClass = {
  CONTAINER: "ColorsView",
};
