/* eslint-disable react/no-multi-comp, no-alert */
import React, {PropTypes} from "react";

import {Button, Wizard, TextInput} from "../src/";

class AddressStep extends React.Component {
  static validate(wizardState) {
    return wizardState.address && wizardState.address.length !== 0;
  }

  render() {
    const {setWizardState, wizardState, recipient} = this.props;
    return (
      <form ref={(f) => { this.form = f; }} onSubmit={(e) => e.preventDefault()}>
        <p>Delivery for {recipient}</p>
        <TextInput
          label="Address"
          required
          type="text" name="address"
          onChange={() => setWizardState({address: this.form.elements.address.value})}
          value={wizardState.address || ""}
        />
      </form>
    );
  }
}

AddressStep.propTypes = {
  recipient: PropTypes.string.isRequired,
};

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
    const {wizardState, setWizardState} = this.props;
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
    const {setWizardState, wizardState} = this.props;
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
      </form>
    );
  }
}

AddressStep.propTypes = {
  wizardState: PropTypes.object.isRequired,
  setWizardState: PropTypes.func.isRequired,
  recipient: PropTypes.string.isRequired,
};

ContactStep.propTypes = {
  wizardState: PropTypes.object.isRequired,
  setWizardState: PropTypes.func.isRequired,
};

ReviewStep.propTypes = {
  wizardState: PropTypes.object.isRequired,
  setWizardState: PropTypes.func.isRequired,
};

export default class WizardExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seekable: false,
      showHelp: false,
      prevButtonValue: "Back",
      hideProgressBar: false,
      recipient: "Kristen Stark",
    };
  }
  render() {
    const steps = [
      {
        title: "Delivery Address",
        description: "To ensure that your item will arrive on time, let's make sure that we have " +
          "your contact address saved.",
        component: AddressStep,
        validate: AddressStep.validate,
        props: {
          recipient: this.state.recipient,
        },
        nextButtonValue: "Save address",
      },
      {
        title: "Preferred Primary Delivery Contact",
        description: "Who should we contact when we have arrived to your delivery address?",
        component: ContactStep,
        validate: ContactStep.validate,
        nextButtonValue: "Save contact",
      },
      {
        title: "Review",
        description: "Please review and double check the information below before finalizing the " +
          "delivery process.",
        component: ReviewStep,
        validate: ReviewStep.validate,
        nextButtonValue: "Set delivery",
      },
    ];

    return (<div className="WizardExample">
      <fieldset>
        <legend>Wizard controls</legend>
        <ul style={{listStyleType: "none"}}>
          <li>
            <label>
              <input
                type="checkbox"
                onChange={(e) => this.setState({seekable: e.target.checked})}
              />
              Seekable?
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                onChange={(e) => this.setState({showHelp: e.target.checked})}
              />
              Show help?
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                onChange={(e) => this.setState({hideProgressBar: e.target.checked})}
              />
              Hide progress bar?
            </label>
          </li>
          <li>
            <TextInput
              value={this.state.recipient}
              onChange={(e) => this.setState({recipient: e.target.value})}
              label="Recipient"
              name="recipient"
            />
          </li>
          <li>
            <TextInput
              value={this.state.prevButtonValue}
              onChange={(e) => this.setState({prevButtonValue: e.target.value})}
              label="Prev button text"
              name="prevButtonValue"
            />
          </li>
        </ul>
      </fieldset>

      <Wizard
        title="Delivery setup"
        description="Ensure that your delivery will come on time"
        steps={steps}
        prevButtonValue={this.state.prevButtonValue}
        onComplete={(state) =>
          alert(`Delivering to ${state.fullName} at ${state.address}. ` +
                `Please call ${state.phoneNumber} upon delivery`)
        }
        wizardButtons={[{
          handler: (wizardState, {resetWizard}) => resetWizard(),
          buttonValue: "Clear and start over",
        }]}
        help={this.state.showHelp && <p>
          Need any help? Check out our&nbsp;
          <Button
            onClick={() => alert("LOL, no help for you!")} type="link"
            value="Support Center." style={{padding: 0}}
          />
        </p>}
        seekable={this.state.seekable}
        hideProgressBar={this.state.hideProgressBar}
      />
    </div>);
  }
}
