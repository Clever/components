import React from "react";

import View from "./View";
import { Grid } from "src";
import ComponentBox from "./ComponentBox";

import "./ComponentsView.less";

export default function ComponentsView() {
  const { cssClass, componentsToDisplay } = ComponentsView;
  const { Col, Row } = Grid;

  return (
    <View className={cssClass.CONTAINER} title="Components Portal">
      <Grid>
        <Row grow className={cssClass.CONTAINER_ROW}>
          {componentsToDisplay.map(comp => (
            <ComponentBox
              componentLink={comp.componentLink}
              componentName={comp.componentName}
              componentImg={comp.componentImg}
              componentImgAlt={comp.componentImgAlt}
            />
          ))}
          {/* <Col span={4} className={cssClass.COMPONENT_CONTAINER}>
            <div>
              <p className={cssClass.COMPONENT_TITLE} ><a href="/#/components/alert-box">AlertBox</a></p>
              <img className={cssClass.COMPONTENT_IMG} src="./assets/img/alert-box-warning.png" alt="" />
            </div>
          </Col>
          <Col span={4} className={cssClass.COMPONENT_CONTAINER}>
            <div>
              <p className={cssClass.COMPONENT_TITLE} ><a href="/#/components/badge">Badge</a></p>
              <img className={cssClass.COMPONTENT_IMG} src="./assets/img/badge-2.png" alt="" />
            </div>
          </Col>
          <Col span={4} className={cssClass.COMPONENT_CONTAINER}>
            <div>
              <p className={cssClass.COMPONENT_TITLE} ><a href="/#/components/button">Button</a></p>
              <img className={cssClass.COMPONTENT_IMG} src="./assets/img/button-1.png" alt="" />
            </div>
          </Col> */}
        </Row>
      </Grid>
    </View>
  );
}

ComponentsView.componentsToDisplay = [
  {
    componentLink: "alert-box",
    componentName: "AlertBox",
    componentImg: "alert-box-warning.png",
    componentImgAlt: "A warning AlertBox component",
  },
  {
    componentLink: "badge",
    componentName: "Badge",
    componentImg: "badge-2.png",
    componentImgAlt: "A Badge component",
  },
  {
    componentLink: "button",
    componentName: "Button",
    componentImg: "button-1.png",
    componentImgAlt: "A Button component",
  },
  {
    componentLink: "checkbox",
    componentName: "Checkbox",
    componentImg: "checkbox.png",
    componentImgAlt: "A Checkbox component",
  },
];

ComponentsView.cssClass = {
  CONTAINER: "ComponentsView",
  CONTAINER_ROW: "ComponentsView--Row",
};
