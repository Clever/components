import React from "react";

import Example, { ExampleCode } from "./Example";
import View from "./View";
import { FormElementSize, SegmentedControl, TextArea } from "src";
import PropDocumentation from "./PropDocumentation";

import "./TextAreaView.less";

export default class TextAreaView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      readOnly: false,
      required: false,
      optional: false,
      inputValue: "",
      autoResize: true,
      placeholder: true,
      size: FormElementSize.MEDIUM,
    };
  }

  render() {
    const { cssClass } = TextAreaView;

    return (
      <View className={cssClass.CONTAINER} title="TextArea" sourcePath="src/TextArea/TextArea.tsx">
        <p>
          This component is a <code>textarea</code> that lets the user input multiple lines of text.
        </p>

        <Example>
          <ExampleCode>
            <TextArea
              autoResize={this.state.autoResize}
              disabled={this.state.disabled}
              name="TextAreaName"
              label="TextArea Label"
              readOnly={this.state.readOnly}
              required={this.state.required}
              optional={this.state.optional}
              spellCheck={this.state.spellCheck}
              placeholder={this.state.placeholder ? "TextArea Placeholder" : ""}
              onChange={(e) => this.setState({ inputValue: e.target.value })}
              value={this.state.inputValue}
              size={this.state.size}
            />
          </ExampleCode>
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
              checked={this.state.spellCheck}
              onChange={({ target }) => this.setState({ spellCheck: target.checked })}
            />{" "}
            Spell Check
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.autoResize}
              onChange={({ target }) => this.setState({ autoResize: target.checked })}
            />{" "}
            Auto Resize
          </label>
          <label className={cssClass.CONFIG}>
            <input
              type="checkbox"
              checked={this.state.placeholder}
              onChange={({ target }) => this.setState({ placeholder: target.checked })}
            />{" "}
            Show Placeholder
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
              type: "bool",
              description: "Sets the textarea element as disabled",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "error",
              type: "string",
              description: "Adds error indicator and error text to the element",
              optional: true,
            },
            {
              name: "label",
              type: "string",
              description: "Label for the textarea input",
              optional: true,
            },
            {
              name: "maxLength",
              type: "number",
              description: "Maximum number of characters allowed",
              defaultValue: "None",
              optional: true,
            },
            {
              name: "minLength",
              type: "number",
              description: "Minimum number of characters required",
              defaultValue: "None",
              optional: true,
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
              optional: true,
            },
            {
              name: "onChange",
              type: "function",
              description: "Function called when the textarea's value changes",
              optional: true,
            },
            {
              name: "onFocus",
              type: "function",
              description: "Function called when the element gets focus",
              optional: true,
            },
            {
              name: "onKeyDown",
              type: "function",
              description: "Function called upon keydown in the element",
              optional: true,
            },
            {
              name: "onKeyPress",
              type: "function",
              description: "Function called upon keypress in the element",
              optional: true,
            },
            {
              name: "onKeyUp",
              type: "function",
              description: "Function called upon keyup in the element",
              optional: true,
            },
            {
              name: "optional",
              type: "function",
              description: "Adds an 'Optional' label on the input. Cannot be used with 'required'.",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "placeholder",
              type: "node",
              description: "Placeholder node for the input",
              optional: true,
            },
            {
              name: "readOnly",
              type: "bool",
              description: "Sets the element as read-only",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "required",
              type: "bool",
              description: "Adds a 'Required' label on the input. Cannot be used with 'optional'.",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "spellCheck",
              type: "bool",
              description: "Turns on spell check for the input value",
              defaultValue: "false",
              optional: true,
            },
            {
              name: "value",
              type: "node",
              description: "The actual value of the textarea input",
              optional: true,
            },
            {
              name: "className",
              type: "string",
              description: "Optional additional classname to apply to the TextArea",
              optional: true,
            },
            {
              name: "autoResize",
              type: "boolean",
              description: "Auto grow the textarea in response to user input",
              optional: true,
              defaultValue: "false",
            },
            {
              name: "rows",
              type: "number",
              description: "The number of rows to start the textarea with",
              optional: true,
              defaultValue: 1,
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
              name: "dataTestID",
              type: "string",
              description: "Optional string to provide a data-testid for frontend tests to use",
              optional: true,
            },
          ]}
        />
      </View>
    );
  }
}

TextAreaView.cssClass = {
  CONTAINER: "TextAreaView",
  CONFIG: "TextAreaView--config",
  CONFIG_OPTIONS: "TextAreaView--configOptions",
};
