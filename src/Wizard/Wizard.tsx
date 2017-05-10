import classnames from "classnames";
import * as React from "react";
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
    const {steps} = this.props;
    const {currentStep, data} = this.state;

    // If an onStepComplete handler is provided for the current step, we will only proceed to the
    // next step if the promise returned by the handler resolves to a truthy value.
    if (steps[currentStep].onStepComplete) {
      steps[currentStep].onStepComplete(data).then((success) => success && this.goToNextStep());
      return;
    }
    this.goToNextStep();
  }

  goToNextStep() {
    const {onComplete, steps} = this.props;
    const {currentStep, data} = this.state;

    if (currentStep === steps.length - 1) {
      onComplete(data);
      return;
    }
    const nextStep = Math.min(currentStep + 1);
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
          <div className="Wizard--sidebarContent">
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
                  seekable && "Wizard--stepsDisplay--stepLink"
                );
                const listValue = (<span className={stepClassName}>
                  <span className="Wizard--stepsDisplay--icon" />
                  <span className="Wizard--stepsDisplay--stepTitle">{step.title}</span>
                </span>);
                return (
                  <li key={idx}>
                    { seekable ?
                      <Button
                        className="Wizard--stepsDisplay--stepButton"
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
        </div>

        <div className="Wizard--step">
          <WizardStep
            Component={steps[this.state.currentStep].component}
            componentProps={steps[this.state.currentStep].props}
            stepNumber={this.state.currentStep}
            setWizardState={(changes) => {
              const newState = Object.assign(this.state.data, changes);
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
                className="Wizard--prevButton" type="link"
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
  className:  React.PropTypes.string,
  style:  React.PropTypes.object,
  title:  React.PropTypes.string.isRequired,
  description:  React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]).isRequired,
  help:  React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
  wizardButtons:  React.PropTypes.arrayOf(React.PropTypes.shape({
    handler:  React.PropTypes.func.isRequired,
    buttonValue:  React.PropTypes.node.isRequired,
    buttonClassName:  React.PropTypes.string,
  })),
  initialWizardData:  React.PropTypes.object,
  onComplete:  React.PropTypes.func.isRequired,
  steps:  React.PropTypes.arrayOf(React.PropTypes.shape({
    title:  React.PropTypes.string.isRequired,
    description:  React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
    component:  React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.instanceOf(React.Component)]).isRequired,
    validate:  React.PropTypes.func.isRequired,
    help:  React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
    props:  React.PropTypes.object,
    onStepComplete:  React.PropTypes.func,
  })).isRequired,
  nextButtonValue:  React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
  prevButtonValue:  React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
  seekable:  React.PropTypes.bool,
  hideProgressBar:  React.PropTypes.bool,
};
