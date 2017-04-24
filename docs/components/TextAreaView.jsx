import React from "react";

import Example, {ExampleCode} from "./Example";
import View from "./View";
import {TextArea} from "src";
import PropDocumentation from "./PropDocumentation";

import "./TextAreaView.less";

export default class TextAreaView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      readOnly: false,
      required: false,
      inputValue: "",
    };
  }

  render() {
    const {cssClass} = TextAreaView;

    return (
      <View className={cssClass.CONTAINER} title="TextArea">
        <p>
          This component is a <code>textarea</code> that lets the user input multiple lines of text.
        </p>

        <Example>
          <ExampleCode>
            <TextArea
              disabled={this.state.disabled}
              name="TextAreaName"
              label="TextArea Label"
              readOnly={this.state.readOnly}
              required={this.state.required}
              optional={this.state.optional}
              spellCheck={this.state.spellCheck}
              placeholder="TextArea Placeholder"
              onChange={e => this.setState({inputValue: e.target.value})}
              value={this.state.inputValue}
            />
          </ExampleCode>
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
              checked={this.state.optional}
              onChange={({target}) => this.setState({optional: target.checked})}
              disabled={this.state.required}
            />
            {" "}
            Optional
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.required}
              onChange={({target}) => this.setState({required: target.checked})}
              disabled={this.state.optional}
            />
            {" "}
            Required
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.spellCheck}
              onChange={({target}) => this.setState({spellCheck: target.checked})}
            />
            {" "}
            Spell Check
          </label>
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "disabled",
              type: "bool",
              description: "Sets the textarea element as disabled",
              defaultValue: "false",
            },
            {
              name: "error",
              type: "string",
              description: "Adds error indicator and error text to the element",
            },
            {
              name: "label",
              type: "string",
              description: "Label for the textarea input",
            },
            {
              name: "maxLength",
              type: "number",
              description: "Maximum number of characters allowed",
              defaultValue: "None",
            },
            {
              name: "minLength",
              type: "number",
              description: "Minimum number of characters required",
              defaultValue: "None",
            },
            {
              name: "name",
              type: "string",
              description: "Name for the textarea element (required)",
            },
            {
              name: "onBlur",
              type: "function",
              description: "Function called when the element loses focus",
            },
            {
              name: "onChange",
              type: "function",
              description: "Function called when the textarea's value changes",
            },
            {
              name: "onFocus",
              type: "function",
              description: "Function called when the element gets focus",
            },
            {
              name: "optional",
              type: "function",
              description: "Adds an 'Optional' label on the input. Cannot be used with 'required'.",
              defaultValue: "false",
            },
            {
              name: "placeholder",
              type: "node",
              description: "Placeholder node for the input",
            },
            {
              name: "readOnly",
              type: "bool",
              description: "Sets the element as read-only",
              defaultValue: "false",
            },
            {
              name: "required",
              type: "bool",
              description: "Adds a 'Required' label on the input. Cannot be used with 'optional'.",
              defaultValue: "false",
            },
            {
              name: "spellCheck",
              type: "bool",
              description: "Turns on spell check for the input value",
              defaultValue: "false",
            },
            {
              name: "value",
              type: "node",
              description: "The actual value of the textarea input",
            },
            {
              name: "className",
              type: "string",
              description: "Optional additional classname to apply to the TextArea",
            },
          ]}
        />
      </View>
    );
  }

}

TextAreaView.cssClass = {
  CONFIG: "TextAreaView--config",
  CONTAINER: "TextAreaView",
};
