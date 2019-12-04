import * as React from "react";
import { Grid } from "src";
// import { string } from "prop-types";
// import * as PropTypes from "prop-types";

import "./ComponentBox.less";

export default class ComponentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cssClass } = ComponentBox;
    const { Col } = Grid;
    const { componentLink, componentName, componentImg, componentImgAlt } = this.props;

    return (
      <Col span={4} className={cssClass.COMPONENTBOX_CONTAINER}>
        <div>
          <p className={cssClass.COMPONENTBOX_TITLE}>
            <a href={`/#/components/${componentLink}`}>{componentName}</a>
          </p>
          <img
            className={cssClass.COMPONENTBOX_IMG}
            src={`./assets/img/${componentImg}`}
            alt={componentImgAlt}
          />
        </div>
      </Col>
    );
  }
}

ComponentBox.cssClass = {
  COMPONENTBOX_CONTAINER: "ComponentBox--ComponentContainer",
  COMPONENTBOX_IMG: "ComponentBox--ComponentImg",
  COMPONENTBOX_TITLE: "ComponentBox--ComponentTitle",
};

ComponentBox.propTypes = {
  componentLink: String,
  componentName: String,
  componentImg: String,
  componentImgAlt: String,
};
