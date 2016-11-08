import classnames from "classnames";
import React, {PropTypes} from "react";
import _ from "lodash";

import WizardStep from "./WizardStep";
import {Button, ProgressBar} from "../";

import "./Wizard.less";

const INITIAL_STATE = {
  currentStep: 0,
  stepsVisited: [0],
};
export class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = _.assign(INITIAL_STATE, {
      data: props.initialWizardData || {},
    });
    this.reset = this.reset.bind(this);
    this.prevStepHandler = this.prevStepHandler.bind(this);
    this.nextStepHandler = this.nextStepHandler.bind(this);
  }

  reset() {
    this.setState(_.assign({}, INITIAL_STATE, {data: {}}));
  }

  prevStepHandler() {
    const prevStep = Math.max(0, this.state.currentStep - 1);
    this.setState({
      currentStep: prevStep,
      stepsVisited: _.union(this.state.stepsVisited, [prevStep]),
    });
  }

  nextStepHandler() {
    if (this.state.currentStep === this.props.steps.length - 1) {
      this.props.onComplete(this.state.data);
      return;
    }
    const nextStep = Math.min(this.state.currentStep + 1);
    this.setState({
      currentStep: nextStep,
      stepsVisited: _.union(this.state.stepsVisited, [nextStep]),
    });
  }

  render() {
    const {
      className, style, title, description, help, wizardButtons, steps, nextButtonValue,
      prevButtonValue, seekable,
    } = this.props;

    const classes = classnames("Wizard", className);
    const curStep = steps[this.state.currentStep];
    const validSteps = steps.map(step => step.validate(this.state.data));
    const percentComplete = _.compact(validSteps).length / steps.length;

    const nextDisabled = this.state.currentStep === steps.length - 1 ?
      _.compact(steps.map(step => step.validate(this.state.data))).length !== steps.length
    : !curStep.validate(this.state.data);

    return (
      <div className={classes} style={style}>
        <div className="Wizard--sidebar">
          <h2>{title}</h2>
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

                const listValue = (<span className="Wizard--stepsDisplay--step">
                  { idx === this.state.currentStep ?
                    <span className="Wizard--stepsDisplay--currentStep" />
                  :
                    <span className="Wizard--stepsDisplay--otherStep" />
                  }
                  <span className={iconClassName} />
                  <span className="Wizard--stepsDisplay--stepTitle">{step.title}</span>
                </span>);
                return (
                  <li key={idx}>
                    { seekable ?
                      <Button
                        className="Wizard--stepsDisplay--stepLink"
                        type="link" onClick={() => this.setState({
                          currentStep: idx,
                          stepsVisited: _.union(this.state.stepsVisited, [idx]),
                        })}
                        value={listValue}
                      />
                    :
                      listValue
                    }
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
                    this.state.data, {resetWizard: this.reset})}
                  value={btnSpec.buttonValue}
                  className={classnames("Wizard--controls--control", btnSpec.buttonClassName)}
                />
              ))}
            </div>
          }
        </div>

        <div className="Wizard--step">
          <WizardStep
            Component={steps[this.state.currentStep].component}
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
            help={curStep.help ? curStep.help : help}
            validate={curStep.validate}
            prevButtonValue={curStep.prevButtonValue}
            nextButtonValue={curStep.nextButtonValue}
          />

          <div className="Wizard--contentGroup Wizard--navButtons">
            { this.state.currentStep !== 0 &&
              <Button
                onClick={this.prevStepHandler}
                value={curStep.prevButtonValue || prevButtonValue || "Back"}
              />
            }

            <Button
              onClick={this.nextStepHandler}
              disabled={nextDisabled} type="primary"
              value={curStep.nextButtonValue || nextButtonValue || "Next"}
            />
          </div>
        </div>
      </div>
    );
  }
}

Wizard.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
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
    help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  })),
  nextButtonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  prevButtonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  seekable: PropTypes.bool,
};
