import React, { Component } from "react";

import Example, { ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { FormElementSize, SegmentedControl, TextInput } from "src";

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
      optional: false,
      placeholderCaps: false,
      size: FormElementSize.MEDIUM,
    };
  }

  render() {
    const { cssClass } = TextInputView;

    return (
      <View
        className={cssClass.CONTAINER}
        title="TextInput"
        sourcePath="src/TextInput/TextInput.tsx"
      >
        <p>
          This is your standard <code>input type="text"</code> component.
        </p>

        <Example>
          <div>
            <ExampleCode>
              <TextInput
                disabled={this.state.disabled}
                readOnly={this.state.readOnly}
                required={this.state.required}
                optional={this.state.optional}
                enableShow={this.state.obscured}
                error={this.state.hasError ? "Invalid password" : null}
                type={this.state.obscured ? "password" : "text"}
                label="TextInput Label"
                name="TextInputName"
                placeholder="TextInput Placeholder"
                placeholderCaps={this.state.placeholderCaps}
                onChange={(e) => this.setState({ inputValue: e.target.value })}
                value={this.state.inputValue}
                onMouseOver={(e) => {
                  console.log("mouseover!", e);
                }}
                size={this.state.size}
              />
            </ExampleCode>
          </div>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.disabled}
              onChange={({ target }) => this.setState({ disabled: target.checked })}
            />{" "}
            Disabled
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.readOnly}
              onChange={({ target }) => this.setState({ readOnly: target.checked })}
            />{" "}
            Read Only
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.optional}
              onChange={({ target }) => this.setState({ optional: target.checked })}
              disabled={this.state.required}
            />{" "}
            Optional
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.required}
              onChange={({ target }) => this.setState({ required: target.checked })}
              disabled={this.state.optional}
            />{" "}
            Required
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.hasError}
              onChange={({ target }) => this.setState({ hasError: target.checked })}
            />{" "}
            Error
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.obscured}
              onChange={({ target }) => this.setState({ obscured: target.checked })}
            />{" "}
            Obscured
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.placeholderCaps}
              onChange={({ target }) => this.setState({ placeholderCaps: target.checked })}
            />{" "}
            Placeholder Caps
          </label>
          <div className={cssClass.CONFIG}>
            Size:
            <SegmentedControl
              className={cssClass.CONFIG_OPTIONS}
              options={[
                { content: "small", value: FormElementSize.SMALL },
                { content: "medium", value: FormElementSize.MEDIUM },
                { content: "large", value: FormElementSize.LARGE },
                { content: "full-width", value: FormElementSize.FULL_WIDTH },
              ]}
              value={this.state.size}
              onSelect={(value) => this.setState({ size: value })}
            />
          </div>
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
              description:
                "Sets autocomplete='off' on the input element to disable default browser autocomplete",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "autoComplete",
              type: "String",
              description:
                "Hint for user agents (browsers and assistive technologies) when providing automated assistance in filling out form field values. The disableAutocomplete field will take precedence over this field",
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
              name: "hideButtonText",
              type: "String",
              description: "(Temporary) allows overriding the Hide button text with translations",
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
              name: "onKeyDown",
              type: "Function",
              description: "Function called upon keydown in the element",
              optional: true,
            },
            {
              name: "onKeyPress",
              type: "Function",
              description: "Called when a key is pressed",
              optional: true,
            },
            {
              name: "onKeyUp",
              type: "Function",
              description: "Function called upon keyup in the element",
              optional: true,
            },
            {
              name: "placeholder",
              type: "Node",
              description: "Placeholder node for input",
              optional: true,
            },
            {
              name: "placeholderCaps",
              type: "Bool",
              description: "Determines if placeholder value is capitalized or not",
              defaultValue: "false",
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
              name: "showButtonText",
              type: "String",
              description: "(Temporary) allows overriding the Show button text with translations",
              optional: true,
            },
            {
              name: "size",
              type: "string",
              description: (
                <p>
                  The size of the input. One of:
                  <br />
                  {Object.keys(FormElementSize).map((size) => (
                    <span key={size}>
                      <code>FormElementSize.{size}</code>
                      <br />
                    </span>
                  ))}
                </p>
              ),
              optional: true,
              defaultValue: <code>FormElementSize.FULL_WIDTH</code>,
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
  CONTAINER: "TextInputView",
  CONFIG: "TextInputView--config",
  CONFIG_OPTIONS: "TextInputView--configOptions",
};
