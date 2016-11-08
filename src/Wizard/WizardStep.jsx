import React, {PropTypes} from "react";
import _ from "lodash";

export default function WizardStep({
  title, description, Component, onNext, onPrev, setWizardState, currentStep, wizardState,
}) {
  return (
    <div className="Wizard--WizardStep">
      <h2>Step {currentStep}: {title}</h2>
      { _.isString(description) ?
        <p>{description}</p>
      :
        <div>{description}</div>
      }

      <Component
        onNext={onNext} onPrev={onPrev} setWizardState={setWizardState} wizardState={wizardState}
      />
    </div>
  );
}

WizardStep.propTypes = {
  // external facing
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  Component: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(React.Component)]).isRequired,

  // internal facing
  currentStep: PropTypes.number.isRequired,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  setWizardState: PropTypes.func.isRequired,
  wizardState: PropTypes.object.isRequired,
};
