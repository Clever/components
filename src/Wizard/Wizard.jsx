import classnames from "classnames";
import React, {PropTypes} from "react";
import _ from "lodash";

import WizardStep from "./WizardStep";
import {Button, ProgressBar} from "../";

import "./Wizard.less";

const INITIAL_STATE = {
  currentStep: 0,
  percentComplete: 0,
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
    this.calculatePercentComplete = this.calculatePercentComplete.bind(this);
  }

  reset() {
    this.setState(_.assign({}, INITIAL_STATE, {data: {}}));
  }

  jumpToStep(idx) {
    this.setState({
      currentStep: idx,
      stepsVisited: _.union(this.state.stepsVisited, [idx]),
      percentComplete: this.calculatePercentComplete(),
    });
  }

  prevStepHandler() {
    const prevStep = Math.max(0, this.state.currentStep - 1);
    this.jumpToStep(prevStep);
  }

  nextStepHandler() {
    if (this.state.currentStep === this.props.steps.length - 1) {
      this.props.onComplete(this.state.data);
      return;
    }
    const nextStep = Math.min(this.state.currentStep + 1);
    this.jumpToStep(nextStep);
  }

  calculatePercentComplete(data = this.state.data) {
    const validSteps = this.props.steps.filter(step => step.validate(data));
    return validSteps.length / this.props.steps.length;
  }

  render() {
    const {
      className, style, title, description, help, wizardButtons, steps, nextButtonValue,
      prevButtonValue, seekable, hideProgressBar,
    } = this.props;

    const classes = classnames("Wizard", className);
    const curStep = steps[this.state.currentStep];
    const validSteps = steps.filter(step => step.validate(this.state.data));

    // If on the last step, cannot click next (i.e. complete) unless the whole form is valid; for
    // all other steps, only the current step needs to be valid.
    const nextDisabled = this.state.currentStep === steps.length - 1 ?
      validSteps.length !== steps.length : !curStep.validate(this.state.data);

    return (
      <div className={classes} style={style}>
        <div className="Wizard--sidebar">
          <h2>{title}</h2>
          {_.isString(description) ?
            <p className="Wizard--description">{description}</p>
          :
            <div className="Wizard--description">{description}</div>
          }
          { !hideProgressBar &&
            <ProgressBar percentage={this.state.percentComplete} />
          }
          <ul className="Wizard--stepsDisplay">
            {steps.map((step, idx) => {
              const stepValid = step.validate(this.state.data);
              const stepVisited = _.includes(this.state.stepsVisited, idx);
              const stepClassName = classnames(
                "Wizard--stepsDisplay--step",
                idx === this.state.currentStep && "Wizard--stepsDisplay--currentStep",
                stepValid && "Wizard--stepsDisplay--valid",
                stepVisited && "Wizard--stepsDisplay--visited",
              );
              const listValue = (<span className={stepClassName}>
                <span className="Wizard--stepsDisplay--icon" />
                <span className="Wizard--stepsDisplay--stepTitle">{step.title}</span>
              </span>);
              return (
                <li key={idx}>
                  { seekable ?
                    <Button
                      className="Wizard--stepsDisplay--stepLink"
                      type="link" onClick={() => this.jumpToStep(idx)}
                      value={listValue}
                    />
                  :
                    listValue
                  }
                </li>
              );
            })}
          </ul>
          {wizardButtons &&
            <div className="Wizard--controls">
              {wizardButtons.map((btnSpec, idx) => (
                <Button
                  key={idx}
                  onClick={() => btnSpec.handler(this.state.data, {resetWizard: this.reset})}
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
              const newState = _.merge(this.state.data, changes);
              this.setState({data: newState});
              return newState;
            }}
            wizardState={this.state.data}
            updatePercentComplete={(wizardState) => this.setState({
              percentComplete: this.calculatePercentComplete(wizardState)})
            }
            calculatePercentComplete={this.calculatePercentComplete}
            percentComplete={this.state.percentComplete}
            totalSteps={steps.length}
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
                className="Wizard--prevButton"
                onClick={this.prevStepHandler}
                value={curStep.prevButtonValue || prevButtonValue || "Back"}
              />
            }

            <Button
              className="Wizard--nextButton"
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
    buttonValue: PropTypes.node.isRequired,
    buttonClassName: PropTypes.string,
  })),
  initialWizardData: PropTypes.object,
  onComplete: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    component: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(React.Component)]).isRequired,
    validate: PropTypes.func.isRequired,
    help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  })).isRequired,
  nextButtonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  prevButtonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  seekable: PropTypes.bool,
  hideProgressBar: PropTypes.bool,
};
