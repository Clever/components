import * as classnames from "classnames";
import * as React from "react";
import * as PropTypes from "prop-types";
import {Sticky, StickyContainer} from "react-sticky";

import Step from "./Step";

import "./Stepper.less";

const propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.node,
    success: PropTypes.bool,
    warning: PropTypes.string,
    optional: PropTypes.bool,
  })).isRequired,
  currentStep: PropTypes.string,
  stickySidebar: PropTypes.bool,
  onStepClick: PropTypes.func,
};

const defaultProps = {
  currentStep: "0",
};

const cssClass = {
  CONTAINER: "Stepper",
  SIDEBAR: "Stepper--sidebar",
  STEPS_DISPLAY: "Stepper--stepsDisplay",
};

export default class Stepper extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static cssClass = cssClass;

  _renderSidebar(style) {
    const {currentStep, steps, onStepClick, className} = this.props;

    return (
      <ul style={style} className={cssClass.STEPS_DISPLAY}>
        {steps.map(step =>
          <li key={step.id}>
            <Step
              className={className}
              title={step.title}
              description={step.description}
              label={step.label}
              id={step.id}
              state={step.state}
              current={step.id === currentStep}
              warning={step.warning}
              optional={step.optional}
              onClick={onStepClick}
            />
          </li>
        )}
      </ul>
    );
  }

  render() {
    const {className, style, stickySidebar} = this.props;

    return (
      <StickyContainer className={classnames(cssClass.CONTAINER, className)} style={style}>
        <div className={cssClass.SIDEBAR}>
          {!stickySidebar ? this._renderSidebar(style) :
            <Sticky topOffset={24}>
              {({style: sidebarStyle}) => this._renderSidebar(sidebarStyle)}
            </Sticky>}
        </div>
      </StickyContainer>
    );
  }
}
