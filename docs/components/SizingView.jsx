import React, {PureComponent} from "react";

import Example from "./Example";
import View from "./View";
import {Grid} from "src";

import "./SizingView.less";

export default class SizingView extends PureComponent {
  render() {
    const {cssClass} = SizingView;
    const {Col, Row} = Grid;
    return (
      <View className={cssClass.CONTAINER} title="Sizing">
        <Grid>
          <Row grow className="margin--bottom--5xl padding--right--m">
            <Col span={6} className="flexbox self--start padding--right--l">
              <div>
                <h2>Base Unit</h2>
                <p>
                  The Clever design system is based off of the rem unit, which most browsers default to 16px.
                  All other sizes are scaled off of the base rem unit to create visual rhythm and coherence.
                </p>
              </div>
            </Col>
            <Col span={4} className="flexbox self--start padding--right--l">
              <div>
                <h3>1 rem</h3>
                <div className="Size--m"></div>
              </div>
            </Col>
          </Row>
          <Row grow className="margin--bottom--5xl">
            <Col span={6} className="flexbox self--start padding--right--l">
              <div>
                <h2>Sizing Scale</h2>
                <p>
                  The sizing scale increases in half steps from the base unit. It decreases in quarter steps
                  with extra fine steps for the smallest of sizes.
                </p>
                <p>You should reference sizing variables when setting explicit sizes on non-text elements.</p>
                <p>For padding or margin usage, refer to the spacing documentation.</p>
              </div>
            </Col>
            <Col span={4} className="flexbox self--start padding--right--l">
              <Example
                title=""
                code={`
                  <style>
                    .Size--m {
                      height: @size_m;
                      width: @size_m;
                    }
                  </style>

                  <div className="Size--4xs"></div>
                  <div className="Size--3xs"></div>
                  <div className="Size--2xs"></div>
                  <div className="Size--xs"></div>
                  <div className="Size--s"></div>
                  <div className="Size--m"></div>
                  <div className="Size--l"></div>
                  <div className="Size--xl"></div>
                  <div className="Size--2xl"></div>
                  <div className="Size--3xl"></div>
                  <div className="Size--4xl"></div>
                  <div className="Size--5xl"></div>
                `}
              >
                <div className="Size--4xs Size--unit"></div>
                <div className="Size--3xs Size--unit"></div>
                <div className="Size--2xs Size--unit"></div>
                <div className="Size--xs Size--unit"></div>
                <div className="Size--s Size--unit"></div>
                <div className="Size--m Size--unit"></div>
                <div className="Size--l Size--unit"></div>
                <div className="Size--xl Size--unit"></div>
                <div className="Size--2xl Size--unit"></div>
                <div className="Size--3xl Size--unit"></div>
                <div className="Size--4xl Size--unit"></div>
                <div className="Size--5xl Size--unit"></div>
              </Example>
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}

SizingView.cssClass = {
  CONTAINER: "SizingView",
};
