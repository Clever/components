import * as PropTypes from "prop-types";
import * as React from "react";

import { FlexBox } from "../../src";

import "./ComponentBox.less";

export default class ComponentBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { cssClass } = ComponentBox;
    const { componentLink, componentName, componentImg, componentImgAlt } = this.props;

    return (
      <FlexBox column className={cssClass.COMPONENTBOX_CONTAINER}>
        <div>
          <h3 className={cssClass.COMPONENTBOX_TITLE}>
            <a href={`/#/components/${componentLink}`}>{componentName}</a>
          </h3>
          <img
            className={cssClass.COMPONENTBOX_IMG}
            src={`./assets/img/${componentImg}`}
            alt={componentImgAlt}
          />
        </div>
      </FlexBox>
    );
  }
}

ComponentBox.cssClass = {
  COMPONENTBOX_CONTAINER: "ComponentBox--ComponentContainer",
  COMPONENTBOX_IMG: "ComponentBox--ComponentImg",
  COMPONENTBOX_TITLE: "ComponentBox--ComponentTitle",
};

ComponentBox.propTypes = {
  componentLink: PropTypes.string,
  componentName: PropTypes.string,
  componentImg: PropTypes.string,
  componentImgAlt: PropTypes.string,
};
