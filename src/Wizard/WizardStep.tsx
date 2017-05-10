import * as React from "react";
import _ from "lodash";
import classnames from "classnames";

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

  component;

  updateDimensions() {
    const renderedStepWidth = this.component.offsetWidth;
    this.setState({
      helpTextCollapsed: this.state.collapseBreakpointWidth > renderedStepWidth,
    });
  }

  render() {
    const {
      title, description, Component, setWizardState, currentStep, wizardState, help,
      percentComplete, calculatePercentComplete, updatePercentComplete, totalSteps,
      componentProps,
    } = this.props;
    const props = _.omit(componentProps || {}, ["wizardState", "setWizardState"]);
    return (
      <div className="Wizard--WizardStep" ref={(e) => { this.component = e; }}>
        <div className="Wizard--WizardStep--title">
          <h1>Step {currentStep + 1}: {title}</h1>
        </div>

        <div className="Wizard--WizardStep--topInfo">
          { description && (
            <div className="Wizard--contentGroup Wizard--WizardStep--description">
              { _.isString(description) ? <p>{description}</p> : description }
            </div>
          )}
          { help && (
            <div
              className={classnames(
                "Wizard--contentGroup", "Wizard--WizardStep--help",
                this.state.helpTextCollapsed && "Wizard--WizardStep--helpCollapsed"
              )}
            >
              {_.isString(help) ? <p>{help}</p> : help}
            </div>
          )}
        </div>

        <div className="Wizard--contentGroup Wizard--WizardStep--component">
          <Component
            {...props}
            setWizardState={(modifications) => {
              const newState = setWizardState(modifications);

              // this conditional updates the progress bar in 2 scenarios:
              // a) oridnarily, steps update the progress bar once they are navigated away from so
              // that progress only increases when the user actually moves to the next step (see
              // Wizard.jumpToPage()). However, the final page must react to validity immediately to
              // signal completion, so this causes the final page to update the percent complete
              // upon input rather than solely upon navigation.
              // b) pages immediately update the progress bar if they become invalid, so that the
              // incompleteness of the form is reflected in the UI immediately.
              if (currentStep === totalSteps - 1 || calculatePercentComplete(newState) < percentComplete) {
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
  title:  React.PropTypes.string.isRequired,
  description:  React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
  help:  React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
  Component:  React.PropTypes.oneOfType([React.PropTypes.func, React.PropTypes.instanceOf(React.Component)]).isRequired,
  componentProps:  React.PropTypes.object,
  nextButtonValue:  React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),
  prevButtonValue:  React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.node]),

  // internal facing
  currentStep:  React.PropTypes.number.isRequired,
  totalSteps:  React.PropTypes.number.isRequired,
  updatePercentComplete:  React.PropTypes.func.isRequired,
  calculatePercentComplete:  React.PropTypes.func.isRequired,
  percentComplete:  React.PropTypes.number.isRequired,
  setWizardState:  React.PropTypes.func.isRequired,
  wizardState:  React.PropTypes.object.isRequired,
};
