import * as React from "react";
import * as PropTypes from "prop-types";

import Step, { Props as StepProps } from "./Step";

import "./Stepper.less";

export interface Props {
  className?: string;
  steps: StepProps[];
  currentStepID: string;
  onStepClick?: StepProps["onClick"];
}

const propTypes = {
  className: PropTypes.string,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      className: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.node,
      id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      warning: PropTypes.string,
      state: PropTypes.oneOf(["INCOMPLETE", "SUCCESS", "WARNING"]),
      current: PropTypes.bool,
      optional: PropTypes.bool,
      onClick: PropTypes.func,
    }),
  ).isRequired,
  currentStepID: PropTypes.string.isRequired,
  onStepClick: PropTypes.func,
};

const cssClass = {
  STEPS_DISPLAY: "Stepper--stepsDisplay",
};

export default class Stepper extends React.PureComponent<Props> {
  static propTypes = propTypes;

  render() {
    const { currentStepID, steps, onStepClick, className } = this.props;
    return (
      <ul className={cssClass.STEPS_DISPLAY}>
        {steps.map((step, idx) => (
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
        ))}
      </ul>
    );
  }
}
