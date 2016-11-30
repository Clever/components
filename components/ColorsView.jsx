import React, {PureComponent} from "react";

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
          <Row grow className="items--stretch margin--bottom--5xl padding--right--m">
            <Col span={6} className="flexbox self--start padding--right--l">
              <div className="display--block">
                <h2>Primary Color</h2>
                <p>This tone and shade of blue reflects the bold and inspirational nature of the Clever vision. It was also inspired by the bright colors used in many of today’s classrooms.</p>
              </div>
            </Col>
            <Col span={5} className="flexbox">
              <Row grow classname="items--stretch">
                <Col span={12} className="flexbox">
                  <div className="color--block large--color--block bg--primary_blue">
                    <h2 className="">Primary Blue</h2>
                    <p>@primary_blue</p>
                  </div>
                </Col>
                <Col span={3} className="flexbox">
                  <div className="color--block step--color--block bg--primary_blue--shade-4">
                    <h4 className="">Shade 4</h4>
                  </div>
                </Col>
                <Col span={3} className="flexbox">
                  <div className="color--block step--color--block bg--primary_blue--shade-2">
                    <h4 className="">Shade 2</h4>
                  </div>
                </Col>
                <Col span={3} className="flexbox">
                  <div className="color--block step--color--block bg--primary_blue--tint-2">
                    <h4 className="">Tint 2</h4>
                  </div>
                </Col>
                <Col span={3} className="flexbox">
                  <div className="color--block step--color--block bg--primary_blue--tint-4">
                    <h4 className="">Tint 4</h4>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row grow className="items--stretch margin--bottom--5xl">
            <Col span={6} className="flexbox self--start padding--right--l">
              <div className="display--block">
                <h2>Neutral Colors</h2>
                <p>To support the Clever Blue, these neutral colors have been chosen to add contrast and heirarchy for borders, backgrounds, and text styles.</p>
              </div>
            </Col>
            <Col span={5} className="flexbox">
              <Row grow className="items--stretch">
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
          <Row grow className="items--stretch margin--bottom--5xl">
            <Col span={6} className="flexbox self--start padding--right--l">
              <div className="display--block">
                <h2>Alert Colors</h2>
                <p>To support the Clever Blue, these neutral colors have been chosen to add contrast and heirarchy for borders, backgrounds, and text styles.</p>
              </div>
            </Col>
            <Col span={5} className="flexbox">
              <Row grow>
                <Col span={4} className="flexbox margin--bottom--l">
                  <div className="color--block bg--alert_green">
                    <h4 className="">@alert_green</h4>
                  </div>
                </Col>
                <Col span={4} className="flexbox margin--bottom--l">
                  <div className="color--block bg--alert_orange">
                    <h4 className="">@alert_orange</h4>
                  </div>
                </Col>
                <Col span={4} className="flexbox margin--bottom--l">
                  <div className="color--block bg--alert_red">
                    <h4 className="">@alert_red</h4>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row grow className="items--stretch margin--bottom--5xl">
            <Col span={6} className="flexbox self--start padding--right--l">
              <div className="display--block">
                <h2>Accent Colors</h2>
                <p>To support the Clever Blue, these neutral colors have been chosen to add contrast and heirarchy for borders, backgrounds, and text styles.</p>
              </div>
            </Col>
            <Col span={5} className="flexbox">
              <Row grow className="items--stretch">
                <Col span={4} className="flexbox margin--bottom--l">
                  <div className="color--block bg--accent_aqua">
                    <h4 className="">@accent_aqua</h4>
                  </div>
                </Col>
                <Col span={4} className="flexbox margin--bottom--l">
                  <div className="color--block bg--accent_pink">
                    <h4 className="">@accent_pink</h4>
                  </div>
                </Col>
                <Col span={4} className="flexbox margin--bottom--l">
                  <div className="color--block bg--accent_purple">
                    <h4 className="">@accent_purple</h4>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row grow className="items--stretch margin--bottom--5xl padding--right--m">
            <Col span={6} className="flexbox self--start padding--right--l">
              <div className="display--block">
                <h2>Shades and Tints</h2>
                <p>To provide the subtly and range necessary for interaction patterns on a modern web interface, we use a scale of shades and tints for our existing color palettes. We use a tint and shade scale which add white or black respectively to the base color in 15% increments.</p>
              </div>
            </Col>
            <Col span={5} className="flexbox">
              <Row grow className="items--stretch justify--left">
                <Col span={12} className="flexbox">
                  <div className="color--block large--color--block bg--alert_green">
                    <h2 className="">Example</h2>
                    <p>@alert_green</p>
                  </div>
                </Col>
                <Col span={2} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--shade-6">
                    <h4 className="">Shade 6</h4>
                  </div>
                </Col>
                <Col span={2} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--shade-5">
                    <h4 className="">Shade 5</h4>
                  </div>
                </Col>
                <Col span={2} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--shade-4">
                    <h4 className="">Shade 4</h4>
                  </div>
                </Col>
                <Col span={2} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--shade-3">
                    <h4 className="">Shade 3</h4>
                  </div>
                </Col>
                <Col span={2} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--shade-2">
                    <h4 className="">Shade 2</h4>
                  </div>
                </Col>
                <Col span={2} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--shade-1">
                    <h4 className="">Shade 1</h4>
                  </div>
                </Col>
                <Col span={2} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--tint-1">
                    <h4 className="">Tint 1</h4>
                  </div>
                </Col>
                <Col span={2} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--tint-2">
                    <h4 className="">Tint 2</h4>
                  </div>
                </Col>
                <Col span={2} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--tint-3">
                    <h4 className="">Tint 3</h4>
                  </div>
                </Col>
                <Col span={2} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--tint-4">
                    <h4 className="">Tint 4</h4>
                  </div>
                </Col>
                <Col span={2} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--tint-5">
                    <h4 className="">Tint 5</h4>
                  </div>
                </Col>
                <Col span={2} className="flexbox">
                  <div className="color--block step--color--block bg--alert_green--tint-6">
                    <h4 className="">Tint 6</h4>
                  </div>
                </Col>
              </Row>
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
