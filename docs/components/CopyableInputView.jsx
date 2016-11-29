import React, {Component} from "react";

import Example from "./Example";
import View from "./View";
import {CopyableInput} from "src";

import "./CopyableInputView.less";


export default class CopyableInputView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      readOnly: false,
      hasError: false,
      inputValue: "🙈 🙉 🙊",
      obscured: true,
      required: false,
    };
  }

  render() {
    const {cssClass} = CopyableInputView;

    return (
      <View className={cssClass.CONTAINER} title="CopyableInput">
        <Example
          code={`
            <CopyableInput
              enableCopy
              disabled={this.state.disabled}
              required={this.state.required}
              enableShow={this.state.obscured}
              error={this.state.hasError ? "Enter a valid email address" : null}
              type={this.state.obscured ? "password" : "text"}
              label="CopyableInput Label"
              name="CopyableInputName"
              placeholder="CopyableInput Placeholder"
              onChange={e => this.setState({inputValue: e.target.value})}
              value={this.state.inputValue}
              readOnly={this.state.readOnly}
            />
          `}
        >
          <div className={cssClass.INPUT_CONTAINER}>
            <CopyableInput
              enableCopy
              disabled={this.state.disabled}
              readOnly={this.state.readOnly}
              required={this.state.required}
              enableShow={this.state.obscured}
              error={this.state.hasError ? "Enter a valid email address" : null}
              type={this.state.obscured ? "password" : "text"}
              label="CopyableInput Label"
              name="CopyableInputName"
              placeholder="CopyableInput Placeholder"
              onChange={e => this.setState({inputValue: e.target.value})}
              value={this.state.inputValue}
            />
          </div>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.disabled}
              onChange={({target}) => this.setState({disabled: target.checked})}
            />
            {" "}
            Disabled
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.readOnly}
              onChange={({target}) => this.setState({readOnly: target.checked})}
            />
            {" "}
            Read Only
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.required}
              onChange={({target}) => this.setState({required: target.checked})}
            />
            {" "}
            Required
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.hasError}
              onChange={({target}) => this.setState({hasError: target.checked})}
            />
            {" "}
            Error
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.obscured}
              onChange={({target}) => this.setState({obscured: target.checked})}
            />
            {" "}
            Obscured
          </label>
        </Example>
      </View>
    );
  }
}

CopyableInputView.cssClass = {
  CONFIG: "CopyableInputView--config",
  CONTAINER: "CopyableInputView",
  INPUT_CONTAINER: "CopyableInputView--inputContainer",
};
