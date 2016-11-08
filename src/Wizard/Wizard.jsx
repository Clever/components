import classnames from "classnames";
import React, {PropTypes} from "react";
import _ from "lodash";

import WizardStep from "./WizardStep";
import {Button, ProgressBar} from "../";

import "./Wizard.less";

const INITIAL_STATE = {
  currentStep: 0,
};
export class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = _.assign(INITIAL_STATE, {
      data: props.initialWizardData || {},
      stepsVisited: [0],
    });
  }

  render() {
    const {
      className, style, title, description, helpText, wizardButtons, onComplete, steps,
    } = this.props;

    const classes = classnames("Wizard", className);
    const curStep = steps[this.state.currentStep];
    const validSteps = steps.map(step => step.validate(this.state.data));
    const percentComplete = _.compact(validSteps).length / steps.length;

    return (
      <div className={classes} style={style}>
        <div className="Wizard--sidebar">
          <h1>{title}</h1>
          {_.isString(description) ?
            <p>{description}</p>
          :
            <div>{description}</div>
          }
          <ProgressBar percentage={percentComplete} />
          <div className="Wizard--stepsDisplay">
            <ul>
              {steps.map((step, idx) => {
                const stepValid = step.validate(this.state.data);
                const stepVisited = this.state.stepsVisited.includes(idx);
                const iconClassName = classnames(
                  "Wizard--stepsDisplay--icon",
                  stepValid && "Wizard--stepsDisplay--valid",
                  stepVisited && "Wizard--stepsDisplay--visited",
                );
                return (
                  <li key={idx}>
                    { idx === this.state.currentStep ?
                      <span className="Wizard--stepsDisplay--currentStep" />
                    :
                      <span className="Wizard--stepsDisplay--otherStep" />
                    }
                    <span className={iconClassName} />
                    <span>{step.title}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          {wizardButtons &&
            <div className="Wizard--controls">
              {wizardButtons.map((btnSpec, idx) => (
                <Button
                  key={idx}
                  onClick={() => btnSpec.handler(
                    this.state.data, () => this.setState(_.assign({}, INITIAL_STATE, {data: {}})))}
                  value={btnSpec.buttonValue}
                  className={classnames("Wizard--controls--control", btnSpec.buttonClassName)}
                />
              ))}
            </div>
          }
        </div>
        <WizardStep
          Component={steps[this.state.currentStep].component}
          onNext={() => {
            if (this.state.currentStep === steps.length - 1) {
              onComplete(this.state.data);
              return;
            }
            const nextStep = Math.min(this.state.currentStep + 1);
            this.setState({
              currentStep: nextStep,
              stepsVisited: _.union(this.state.stepsVisited, [nextStep]),
            });
          }}
          onPrev={() => {
            const prevStep = Math.max(0, this.state.currentStep - 1);
            this.setState({
              currentStep: prevStep,
              stepsVisited: _.union(this.state.stepsVisited, [prevStep]),
            });
          }}
          stepNumber={this.state.currentStep}
          setWizardState={(changes) => {
            this.setState({
              data: _.merge(this.state.data, changes),
            });
          }}
          wizardState={this.state.data}
          title={curStep.title}
          description={curStep.description}
          currentStep={this.state.currentStep}
        />
        <p>{helpText}</p>
      </div>
    );
  }
}

Wizard.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  helpText: PropTypes.string,
  wizardButtons: PropTypes.arrayOf(PropTypes.shape({
    handler: PropTypes.func.isRequired,
    buttonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    buttonClassName: PropTypes.string,
  })),
  initialWizardData: PropTypes.object,
  onComplete: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(React.Component)]).isRequired,
    validate: PropTypes.func.isRequired,
  })),
};
