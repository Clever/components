import React, {Component} from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {TextInput} from "src";

import "./TextInputView.less";


export default class TextInputView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      readOnly: false,
      hasError: false,
      inputValue: "",
      obscured: false,
      required: false,
    };
  }

  render() {
    const {cssClass} = TextInputView;

    return (
      <View className={cssClass.CONTAINER} title="TextInput">
        <Example
          code={`
            <TextInput
              disabled={this.state.disabled}
              readOnly={this.state.readOnly}
              required={this.state.required}
              enableShow={this.state.obscured}
              error={this.state.hasError ? "Enter a valid email address" : null}
              type={this.state.obscured ? "password" : "text"}
              label="TextInput Label"
              name="TextInputName"
              placeholder="TextInput Placeholder"
              onChange={e => this.setState({inputValue: e.target.value})}
              value={this.state.inputValue}
            />
          `}
        >
          <div className={cssClass.INPUT_CONTAINER}>
            <TextInput
              disabled={this.state.disabled}
              readOnly={this.state.readOnly}
              required={this.state.required}
              enableShow={this.state.obscured}
              error={this.state.hasError ? "Invalid password" : null}
              type={this.state.obscured ? "password" : "text"}
              label="TextInput Label"
              name="TextInputName"
              placeholder="TextInput Placeholder"
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

        <PropDocumentation
          availableProps={[
            {
              name: "disabled",
              type: "Bool",
              description: "Sets element as disabled",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "disableAutocomplete",
              type: "Bool",
              description: "Sets autocomplete='off' on the input element to disable default browser autocomplete",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "enableShow",
              type: "Bool",
              description: "Displays a show/hide text link that reveals passwords",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "error",
              type: "String",
              description: "Adds indicator and error text to element",
              optional: true,
            },
            {
              name: "label",
              type: "String",
              description: "Label for input",
              optional: true,
            },
            {
              name: "name",
              type: "String",
              description: "Name for input element",
              optional: true,
            },
            {
              name: "onBlur",
              type: "Function",
              description: "Called when focus leaves the input",
              optional: true,
            },
            {
              name: "onChange",
              type: "Function",
              description: "Called when value of input changes",
              optional: true,
            },
            {
              name: "onFocus",
              type: "Function",
              description: "Called when when the input acquires focus",
              optional: true,
            },
            {
              name: "onKeyPress",
              type: "Function",
              description: "Called when a key is pressed",
              optional: true,
            },
            {
              name: "placeholder",
              type: "Node",
              description: "Placeholder node for input",
              optional: true,
            },
            {
              name: "readOnly",
              type: "Bool",
              description: "Sets element as read only",
              optional: true,
            },
            {
              name: "required",
              type: "Bool",
              description: "Marks input as required and adds indicator",
              optional: true,
            },
            {
              name: "type",
              type: "String",
              description: "The type of control to display, tested 'number' and 'text'",
              defaultValue: "text",
              optional: true,
            },
            {
              name: "value",
              type: "Node",
              description: "Value of input",
              optional: true,
            },
          ]}
          className={cssClass.PROPS}
        />
      </View>
    );
  }
}

TextInputView.cssClass = {
  CONFIG: "TextInputView--config",
  CONTAINER: "TextInputView",
  INPUT_CONTAINER: "TextInputView--inputContainer",
};
