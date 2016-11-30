import React, {PureComponent} from "react";

import View from "./View";
import {Grid} from "src";

export default class PageLayoutView extends PureComponent {
  render() {
    const {cssClass} = PageLayoutView;
    const {Col, Row, Size} = Grid;

    return (
      <View className={cssClass.CONTAINER} title="Page Layouts">
        <Grid>
          <Row grow className="items--start margin--bottom--xl">
            <Col span={6} className="flexbox justify--left items--center padding--right--l">
              <div className="display--block">
                <h2>Consistent structures</h2>
                <p>Layouts are templates that provide consistency through an application and across products by setting up pre-defined spacing, sections, and columns.</p>
              </div>
            </Col>
            <Col span={4} className="flexbox justify--left items--center">
              
            </Col>
          </Row>
          <Row grow className="items--start margin--bottom--xl">
            <Col span={6} className="flexbox justify--left items--center padding--right--l">
              <div className="display--block">
                <h3>Profile</h3>
                <p>A profile layout is a singular view on an object. It consists of a highlights panel which sticks to the top of the page when scrolled down, and a main content area which may include multiple tabs of content.</p>
              </div>
            </Col>
            <Col span={4} className="flexbox justify--left items--center">
              
            </Col>
          </Row>
          <Row grow className="items--start margin--bottom--xl">
            <Col span={6} className="flexbox justify--left items--center padding--right--l">
              <div className="display--block">
                <h3>Wizard</h3>
                <p>A wizard layout is a focused view enabling progressive workflows. It consists of a left sidebar which shows the progress and steps in the workfow, a main content area that changes based on the step, and sometimes a right sidebar showing help content for each step.</p>
              </div>
            </Col>
            <Col span={4} className="flexbox justify--left items--center">
              
            </Col>
          </Row>
        </Grid>
      </View>
    );
  }
}

PageLayoutView.cssClass = {
  CONTAINER: "PageLayoutView",
};
