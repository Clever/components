import React, {PropTypes} from "react";
import _ from "lodash";

export default function WizardStep({
  title, description, Component, setWizardState, currentStep, wizardState, help,
}) {
  return (
    <div className="Wizard--WizardStep">
      <h1>Step {currentStep}: {title}</h1>

      { description && (
        <div className="Wizard--contentGroup">
          { _.isString(description) ? <p>{description}</p> : {description} }
        </div>
      )}

      { help && (
        <div className="Wizard--contentGroup Wizard--WizardStep--help">
          {_.isString(help) ? <p>{help}</p> : {help}}
        </div>
      )}

      <div className="Wizard--contentGroup">
        <Component setWizardState={setWizardState} wizardState={wizardState} />
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
  setWizardState: PropTypes.func.isRequired,
  wizardState: PropTypes.object.isRequired,
};
