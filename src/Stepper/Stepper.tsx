import * as React from "react";
import * as PropTypes from "prop-types";
import * as classnames from "classnames";
import {Sticky, StickyContainer} from "react-sticky";


import Step from "./Step";

import "./Stepper.less";

const propTypes = {
  className: PropTypes.string,
  steps: PropTypes.arrayOf(PropTypes.shape({
    className: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.node,
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    warning: PropTypes.string,
    state: PropTypes.oneOf(["INCOMPLETE", "SUCCESS", "WARNING"]),
    current: PropTypes.bool,
    optional: PropTypes.bool,
    onClick: PropTypes.func,
  })).isRequired,
  currentStepID: PropTypes.string.isRequired,
  onStepClick: PropTypes.func,
  sticky: PropTypes.bool,
};

const cssClass = {
  STEPS_DISPLAY: "Stepper--stepsDisplay",
  STICKY_CONTAINER: "Stepper--stickyContainer",
  STICKY_CONTENT: "Stepper--stickyContent",
};

export default class Stepper extends React.PureComponent {
  static propTypes = propTypes;
  static cssClass = cssClass;

  _renderSidebar(style) {
    const {currentStepID, steps, onStepClick, className} = this.props;
    return (
      <div style={style}>
        <ul className={cssClass.STEPS_DISPLAY}>
          {steps.map((step, idx) =>
            <li key={step.id}>
              <Step
                className={className}
                title={step.title}
                description={step.description}
                label={idx + 1}
                id={step.id}
                state={step.state}
                current={step.id === currentStepID}
                warning={step.warning}
                optional={step.optional}
                onClick={onStepClick}
              />
            </li>
          )}
        </ul>
      </div>);
  }

  render() {
    const {sticky} = this.props;
    return (
      <StickyContainer className={classnames(cssClass.STICKY_CONTAINER)}>
        <div className={cssClass.STICKY_CONTENT}>
          {!sticky ? this._renderSidebar(null) :
            <Sticky>
              {({style}) => this._renderSidebar(style)}
            </Sticky>}
        </div>
      </StickyContainer>
    );
  }
}
