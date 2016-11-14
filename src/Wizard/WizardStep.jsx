import React, {PropTypes} from "react";
import _ from "lodash";

export default function WizardStep({
  title, description, Component, setWizardState, currentStep, wizardState, help,
  percentComplete, calculatePercentComplete, updatePercentComplete, totalSteps,
}) {
  return (
    <div className="Wizard--WizardStep">
      <div className="Wizard--WizardStep--title">
        <h1>Step {currentStep + 1}: {title}</h1>
      </div>

      { description && (
        <div className="Wizard--contentGroup Wizard--WizardStep--description">
          { _.isString(description) ? <p>{description}</p> : description }
        </div>
      )}

      <div className="Wizard--WizardStep--componentWrapper">
        <div className="Wizard--contentGroup Wizard--WizardStep--component">
          <Component
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

        { help && (
          <div className="Wizard--contentGroup Wizard--WizardStep--help">
            {_.isString(help) ? <p>{help}</p> : help}
          </div>
        )}
      </div>
    </div>
  );
}

WizardStep.propTypes = {
  // external facing
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(React.Component)]).isRequired,
  nextButtonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  prevButtonValue: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),

  // internal facing
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
  updatePercentComplete: PropTypes.func.isRequired,
  calculatePercentComplete: PropTypes.func.isRequired,
  percentComplete: PropTypes.number.isRequired,
  setWizardState: PropTypes.func.isRequired,
  wizardState: PropTypes.object.isRequired,
};
