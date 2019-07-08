import * as React from "react";
import * as PropTypes from "prop-types";
import * as _ from "lodash";
import * as classnames from "classnames";
import { classNameFor } from "../utils";

// 58.25 rem = width of sidebar + width of left column
const COLLAPSE_BREAKPOINT_WIDTH_REM = 63.25;

export default class WizardStep extends React.Component {
  constructor(props) {
    super(props);

    // NOTE: if a webpage explicitly changes the font size on the html element, this may be
    // incorrect, as rem is calculated against the browser-set font-size, not that of the html
    // element.
    // NOTE: this assumes the font size is expressed in px.
    const fontSize = window.getComputedStyle(document.getElementsByTagName("html")[0])["font-size"];
    this.state = {
      renderedStepWidth: null,
      collapseBreakpointWidth: COLLAPSE_BREAKPOINT_WIDTH_REM * parseFloat(fontSize),
    };
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    const renderedStepWidth = this.component.offsetWidth;
    this.setState({
      helpTextCollapsed: this.state.collapseBreakpointWidth > renderedStepWidth,
    });
  }

  render() {
    const {
      title,
      description,
      Component,
      setWizardState,
      currentStep,
      wizardState,
      help,
      percentComplete,
      calculatePercentComplete,
      updatePercentComplete,
      totalSteps,
      componentProps,
      className,
      stepNumberInTitle,
    } = this.props;
    const props = _.omit(componentProps || {}, ["wizardState", "setWizardState"]);
    const baseClasses = ["Wizard", className]
      .filter(c => !!c)
      .map(c => classNameFor(c, "WizardStep"));
    const contentGroupClass = classNameFor(["Wizard", className], "contentGroup");
    return (
      <div
        className={classnames(baseClasses)}
        ref={e => {
          this.component = e;
        }}
      >
        <div className={classNameFor(baseClasses, "title")}>
          <h1>
            {stepNumberInTitle && `Step ${currentStep + 1}: `}
            {title}
          </h1>
        </div>

        <div className={classNameFor(baseClasses, "topInfo")}>
          {description && (
            <div
              className={classnames(contentGroupClass, classNameFor(baseClasses, "description"))}
            >
              {_.isString(description) ? <p>{description}</p> : description}
            </div>
          )}
          {help && (
            <div
              className={classnames(
                contentGroupClass,
                classNameFor(baseClasses, "help"),
                this.state.helpTextCollapsed && classNameFor(baseClasses, "helpCollapsed"),
              )}
            >
              {_.isString(help) ? <p>{help}</p> : help}
            </div>
          )}
        </div>

        <div className={classnames(contentGroupClass, classNameFor(baseClasses, "component"))}>
          <Component
            {...props}
            setWizardState={modifications => {
              const newState = setWizardState(modifications);

              // this conditional updates the progress bar in 2 scenarios:
              // a) oridnarily, steps update the progress bar once they are navigated away from so
              // that progress only increases when the user actually moves to the next step (see
              // Wizard.jumpToPage()). However, the final page must react to validity immediately to
              // signal completion, so this causes the final page to update the percent complete
              // upon input rather than solely upon navigation.
              // b) pages immediately update the progress bar if they become invalid, so that the
              // incompleteness of the form is reflected in the UI immediately.
              if (
                currentStep === totalSteps - 1 ||
                calculatePercentComplete(newState) < percentComplete
              ) {
                updatePercentComplete(newState);
              }
            }}
            wizardState={wizardState}
          />
        </div>
      </div>
    );
  }
}

WizardStep.propTypes = {
  // external facing
  title: PropTypes.string.isRequired,
  stepNumberInTitle: PropTypes.bool.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(React.Component)])
    .isRequired,
  componentProps: PropTypes.object,

  // internal facing
  className: PropTypes.string,
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  updatePercentComplete: PropTypes.func.isRequired,
  calculatePercentComplete: PropTypes.func.isRequired,
  percentComplete: PropTypes.number.isRequired,
  setWizardState: PropTypes.func.isRequired,
  wizardState: PropTypes.object.isRequired,
};
