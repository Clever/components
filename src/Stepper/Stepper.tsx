import * as React from "react";
import * as PropTypes from "prop-types";


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
  onStepClick: PropTypes.func,
};

const defaultProps = {
  currentStep: "0",
};

const cssClass = {
  STEPS_DISPLAY: "Stepper--stepsDisplay",
};

export default class Stepper extends React.PureComponent {
  static propTypes = propTypes;
  static defaultProps = defaultProps;
  static cssClass = cssClass;

  render() {
    const {currentStep, style, steps, onStepClick, className} = this.props;

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
}
