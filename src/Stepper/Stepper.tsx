import * as React from "react";

import Step, { Props as StepProps, StepState } from "./Step";

import "./Stepper.less";

export interface Props {
  className?: string;
  steps: StepProps[];
  currentStepID: string;
  seekableStates?: StepState[];
  onStepClick?: StepProps["onClick"];
}

const cssClass = {
  STEPS_DISPLAY: "Stepper--stepsDisplay",
};

export default class Stepper extends React.PureComponent<Props> {
  render() {
    const { currentStepID, steps, seekableStates, onStepClick, className } = this.props;
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
              onClick={!seekableStates || seekableStates.includes(step.state) ? onStepClick : null}
            />
          </li>
        ))}
      </ul>
    );
  }
}
