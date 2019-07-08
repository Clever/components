import classnames from "classnames";
import React from "react";
import * as PropTypes from "prop-types";
import { Sticky, StickyContainer } from "react-sticky";
import _ from "lodash";

import WizardStep from "./WizardStep";
import { Button, ProgressBar } from "../";
import { classNameFor } from "../utils";

import "./Wizard.less";

// this is a function so that we get a new array each time
const getInitialState = () => ({
  currentStep: 0,
  percentComplete: 0,
  stepsVisited: [0],
});

export class Wizard extends React.Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, getInitialState(), {
      data: props.initialWizardData || {},
    });

    this.reset = this.reset.bind(this);
    this.prevStepHandler = this.prevStepHandler.bind(this);
    this.nextStepHandler = this.nextStepHandler.bind(this);
    this.calculatePercentComplete = this.calculatePercentComplete.bind(this);

    // Launch the wizard at a specific step (e.g. to resume at furthest step)
    if (this.props.initialStep) {
      const idx = this.props.initialStep;
      Object.assign(this.state, {
        currentStep: idx,
        stepsVisited: _.range(idx + 1), // include the step itself
        percentComplete: this.calculatePercentComplete(),
      });
    }
  }

  reset() {
    this.setState(Object.assign({}, getInitialState(), { data: {} }));
  }

  jumpToStep(idx) {
    this.setState({
      currentStep: idx,
      stepsVisited: _.union(this.state.stepsVisited, [idx]),
      percentComplete: this.calculatePercentComplete(),
    });
  }

  prevStepHandler() {
    const { steps } = this.props;

    let prevStep = Math.max(0, this.state.currentStep - 1);
    if (steps[prevStep].shouldSkipStep && steps[prevStep].shouldSkipStep(this.state.data)) {
      prevStep = Math.max(0, prevStep - 1);
    }
    this.jumpToStep(prevStep);
  }

  nextStepHandler() {
    const { steps } = this.props;
    const { currentStep, data } = this.state;

    // If an onStepComplete handler is provided for the current step, we will only proceed to the
    // next step if the promise returned by the handler resolves to a truthy value.
    if (steps[currentStep].onStepComplete) {
      steps[currentStep].onStepComplete(data).then(success => success && this.goToNextStep());
      return;
    }
    this.goToNextStep();
  }

  goToNextStep() {
    const { onComplete, steps } = this.props;
    const { currentStep, data } = this.state;

    let nextStep = currentStep + 1;
    while (
      nextStep < steps.length &&
      steps[nextStep].shouldSkipStep &&
      steps[nextStep].shouldSkipStep(this.state.data)
    ) {
      nextStep++;
    }
    if (nextStep === steps.length) {
      onComplete(data);
      return;
    }
    this.jumpToStep(nextStep);
  }

  calculatePercentComplete(data = this.state.data) {
    const validSteps = this.props.steps.filter(step => step.validate(data));
    return validSteps.length / this.props.steps.length;
  }

  _renderSidebar(style) {
    const {
      title,
      description,
      wizardButtons,
      steps,
      seekable,
      hideProgressBar,
      className,
    } = this.props;
    const baseClasses = ["Wizard", className];
    return (
      <div style={style} className={classNameFor(baseClasses, "sidebarContent")}>
        <h2>{title}</h2>
        {_.isString(description) ? (
          <p className={classNameFor(baseClasses, "description")}>{description}</p>
        ) : (
          <div className={classNameFor(baseClasses, "description")}>{description}</div>
        )}
        {!hideProgressBar && <ProgressBar percentage={this.state.percentComplete} />}
        <ul className={classNameFor(baseClasses, "stepsDisplay")}>
          {steps.map((step, idx) => {
            const stepValid = step.validate(this.state.data);
            const stepVisited = _.includes(this.state.stepsVisited, idx);
            const stepClassName = classnames(
              classNameFor(baseClasses, ["stepsDisplay", "step"]),
              idx === this.state.currentStep &&
                classNameFor(baseClasses, ["stepsDisplay", "currentStep"]),
              stepValid && classNameFor(baseClasses, ["stepsDisplay", "valid"]),
              stepVisited && classNameFor(baseClasses, ["stepsDisplay", "visited"]),
              seekable && classNameFor(baseClasses, ["stepsDisplay", "stepLink"]),
            );
            const listValue = (
              <span className={stepClassName}>
                <span className={classNameFor(baseClasses, ["stepsDisplay", "icon"])} />
                <span className={classNameFor(baseClasses, ["stepsDisplay", "stepTitle"])}>
                  {step.title}
                </span>
              </span>
            );
            return (
              <li key={idx}>
                {seekable ? (
                  <Button
                    className={classNameFor(baseClasses, ["stepsDisplay", "stepButton"])}
                    type="link"
                    onClick={() => this.jumpToStep(idx)}
                    value={listValue}
                  />
                ) : (
                  listValue
                )}
              </li>
            );
          })}
        </ul>
        {wizardButtons && (
          <div className={classNameFor(baseClasses, "controls")}>
            {wizardButtons.map((btnSpec, idx) => (
              <Button
                key={idx}
                onClick={() => btnSpec.handler(this.state.data, { resetWizard: this.reset })}
                value={btnSpec.buttonValue}
                className={classNameFor(baseClasses, ["controls", "control"])}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  render() {
    const {
      className,
      style,
      help,
      steps,
      nextButtonValue,
      prevButtonValue,
      stickySidebar,
      stepNumberInTitle,
    } = this.props;

    const baseClasses = ["Wizard", className].filter(c => !!c);
    const curStep = steps[this.state.currentStep];
    const validSteps = steps.filter(step => step.validate(this.state.data));

    // If on the last step, cannot click next (i.e. complete) unless the whole form is valid; for
    // all other steps, only the current step needs to be valid.
    let nextDisabled;
    if (curStep.canContinue != null) {
      nextDisabled = !curStep.canContinue(this.state.data);
    } else {
      nextDisabled =
        this.state.currentStep === steps.length - 1
          ? validSteps.length !== steps.length
          : !curStep.validate(this.state.data);
    }

    return (
      <StickyContainer className={classnames(baseClasses)} style={style}>
        <div className={classNameFor(baseClasses, "sidebar")}>
          {!stickySidebar ? (
            this._renderSidebar()
          ) : (
            <Sticky topOffset={24}>
              {({ style: sidebarStyle }) => this._renderSidebar(sidebarStyle)}
            </Sticky>
          )}
        </div>

        <div className={classNameFor(baseClasses, "step")}>
          <WizardStep
            className={className}
            Component={steps[this.state.currentStep].component}
            componentProps={steps[this.state.currentStep].props}
            stepNumber={this.state.currentStep}
            stepNumberInTitle={stepNumberInTitle}
            setWizardState={changes => {
              const newState = Object.assign(this.state.data, changes);
              this.setState({ data: newState });
              return newState;
            }}
            wizardState={this.state.data}
            updatePercentComplete={wizardState =>
              this.setState({
                percentComplete: this.calculatePercentComplete(wizardState),
              })
            }
            calculatePercentComplete={this.calculatePercentComplete}
            percentComplete={this.state.percentComplete}
            totalSteps={steps.length}
            title={curStep.title}
            description={curStep.description}
            currentStep={this.state.currentStep}
            help={curStep.help ? curStep.help : help}
            validate={curStep.validate}
          />

          <div
            className={classnames(
              classNameFor(baseClasses, "contentGroup"),
              classNameFor(baseClasses, "navButtons"),
            )}
          >
            {this.state.currentStep !== 0 && (
              <Button
                className={classNameFor(baseClasses, "prevButton")}
                type="link"
                onClick={this.prevStepHandler}
                value={curStep.prevButtonValue || prevButtonValue || "Back"}
              />
            )}

            <Button
              className={classNameFor(baseClasses, "nextButton")}
              onClick={this.nextStepHandler}
              disabled={nextDisabled}
              type="primary"
              value={
                typeof curStep.nextButtonValue === "function"
                  ? curStep.nextButtonValue(this.state.data)
                  : curStep.nextButtonValue || nextButtonValue || "Next"
              }
            />
          </div>
        </div>
      </StickyContainer>
    );
  }
}

Wizard.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  wizardButtons: PropTypes.arrayOf(
    PropTypes.shape({
      handler: PropTypes.func.isRequired,
      buttonValue: PropTypes.node.isRequired,
      buttonClassName: PropTypes.string,
    }),
  ),
  initialWizardData: PropTypes.object,
  onComplete: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      component: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(React.Component)])
        .isRequired,
      nextButtonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.func]),
      validate: PropTypes.func.isRequired,
      canContinue: PropTypes.func,
      help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      props: PropTypes.object,
      onStepComplete: PropTypes.func,
    }),
  ).isRequired,
  initialStep: PropTypes.number,
  nextButtonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  prevButtonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  seekable: PropTypes.bool,
  hideProgressBar: PropTypes.bool,
  stickySidebar: PropTypes.bool,
  stepNumberInTitle: PropTypes.bool,
};

Wizard.defaultProps = {
  stepNumberInTitle: true,
};
