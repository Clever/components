/* eslint-disable react/no-multi-comp */
import React, {PropTypes} from "react";

import {Button, Wizard, TextInput} from "../src/";

class AddressStep extends React.Component {
  static validate(wizardState) {
    return wizardState.address && wizardState.address.length !== 0;
  }

  render() {
    const {setWizardState, onNext, wizardState} = this.props;
    return (
      <form ref={(f) => { this.form = f; }} onSubmit={(e) => e.preventDefault()}>
        <TextInput
          label="Address"
          required
          type="text" name="address"
          onChange={() => setWizardState({address: this.form.elements.address.value})}
          value={wizardState.address || ""}
        />
        <Button
          type="primary" onClick={onNext} value="Save address" disabled={!AddressStep.validate(wizardState)}
        />
      </form>
    );
  }
}

class ContactStep extends React.Component {
  static validate(wizardState) {
    for (const field of ["fullName", "phoneNumber"]) {
      if (!wizardState[field] || wizardState[field].length === 0) {
        return false;
      }
    }
    return true;
  }

  render() {
    const {wizardState, setWizardState, onPrev, onNext} = this.props;
    return (
      <form ref={(f) => { this.form = f; }} onSubmit={(e) => e.preventDefault()}>
        <TextInput
          type="text"
          required
          name="fullName"
          label="Full name"
          onChange={() => setWizardState({
            fullName: this.form.elements.fullName.value,
          })}
          value={wizardState.fullName || ""}
        />
        <TextInput
          label="Phone number"
          required
          type="text"
          name="phoneNumber" onChange={() => setWizardState({
            phoneNumber: this.form.elements.phoneNumber.value,
          })}
          value={wizardState.phoneNumber || ""}
        />
        <Button type="secondary" onClick={onPrev} value="Back" />
        <Button
          type="primary" onClick={onNext} value="Save contact"
          disabled={!ContactStep.validate(wizardState)}
        />
      </form>
    );
  }
}

class ReviewStep extends React.Component {
  static validate(wizardState) {
    for (const field of ["fullName", "phoneNumber", "address"]) {
      if (!wizardState[field] || wizardState[field].length === 0) {
        return false;
      }
    }
    return wizardState.reviewed;
  }

  render() {
    const {setWizardState, wizardState, onPrev, onNext} = this.props;
    return (
      <form ref={(f) => { this.form = f; }} onSubmit={(e) => e.preventDefault()}>
        <div>
          <p>Delivery Address Information</p>
          <TextInput
            label="Address" readOnly type="text" name="address" value={wizardState.address || ""}
          />

          <p>Delivery Contact Information</p>
          <TextInput
            readOnly label="Full name" type="text" name="fullName" value={wizardState.fullName || ""}
          />
          <TextInput
            readOnly label="Phone number" type="text" name="phoneNumber"
            value={wizardState.phoneNumber || ""}
          />
        </div>

        <label>
          <input
            type="checkbox" name="reviewed" onChange={() => setWizardState({
              reviewed: this.form.elements.reviewed.checked,
            })}
            checked={wizardState.reviewed || false}
          />
          I have reviewed the information above and it is correct.
        </label>

        <Button type="secondary" onClick={onPrev} value="Back" />
        <Button
          type="primary" onClick={onNext} value="Set delivery"
          disabled={!ReviewStep.validate(wizardState)}
        />
      </form>
    );
  }
}

AddressStep.propTypes = {
  wizardState: PropTypes.object.isRequired,
  setWizardState: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

ContactStep.propTypes = {
  wizardState: PropTypes.object.isRequired,
  setWizardState: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

ReviewStep.propTypes = {
  wizardState: PropTypes.object.isRequired,
  setWizardState: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onPrev: PropTypes.func.isRequired,
};

export default function WizardExample() {
  const steps = [
    {
      title: "Delivery Address",
      description: "To ensure that your item will arrive on time, let's make sure that we have " +
        "your contact address saved.",
      component: AddressStep,
      validate: AddressStep.validate,
    },
    {
      title: "Delivery Contact",
      description: "Who should we contact when we have arrived to your delivery address?",
      component: ContactStep,
      validate: ContactStep.validate,
    },
    {
      title: "Review",
      description: "Please review and double check the information below before finalizing the " +
        "delivery process.",
      component: ReviewStep,
      validate: ReviewStep.validate,
    },
  ];

  return (
    <Wizard
      title="Delivery setup"
      description="Ensure that your delivery will come on time"
      steps={steps}
      onComplete={(state) =>
        alert(`Delivering to ${state.fullName} at ${state.address}. ` + // eslint-disable-line no-alert
              `Please call ${state.phoneNumber} upon delivery`)
      }
      wizardButtons={[{
        handler: (wizardState, {resetWizard}) => resetWizard(),
        buttonValue: "Clear and start over",
      }]}
    />
  );
}
