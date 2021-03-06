import React, { Component } from "react";

import Example, { ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { DateInput, FormElementSize, SegmentedControl } from "src";

import "./DateInputView.less";

export default class DateInputView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      readOnly: false,
      hasError: false,
      required: false,
      useTime: false,
      value: null,
      size: FormElementSize.MEDIUM,
    };
  }

  render() {
    const { cssClass } = DateInputView;

    return (
      <View title="DateInput" sourcePath="src/DateInput/DateInput.tsx">
        <p>DateInput is an input that allows the user to select dates from a DatePicker.</p>
        <Example>
          <ExampleCode>
            <DateInput
              disabled={this.state.disabled}
              error={this.state.hasError ? "Invalid date" : null}
              label="label"
              onChange={(value) => this.setState({ value })}
              placeholder="Placeholder"
              name="name"
              readOnly={this.state.readOnly}
              required={this.state.required}
              value={this.state.value}
              useTime={this.state.useTime}
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
              checked={this.state.required}
              onChange={({ target }) => this.setState({ required: target.checked })}
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
              checked={this.state.useTime}
              onChange={({ target }) => this.setState({ useTime: target.checked })}
            />{" "}
            Use Time
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
              name: "placeholder",
              type: "Node",
              description: "Placeholder node for input",
              optional: true,
            },
            {
              name: "readOnly",
              type: "Bool",
              description: "Enable read-only styling and disable date input interaction",
              optional: true,
            },
            {
              name: "required",
              type: "Bool",
              description: "Marks input as required and adds indicator",
              optional: true,
            },
            {
              name: "value",
              type: "Date",
              description: "Value of input",
              optional: true,
            },
            {
              name: "min",
              type: "Date",
              description: "Minimum date the user can select.",
              optional: true,
            },
            {
              name: "max",
              type: "Date",
              description: "Maximum date the user can select.",
              optional: true,
            },
            {
              name: "useTime",
              type: "Bool",
              description: "Flag to switch to date time picker input",
              optional: true,
            },
            {
              name: "popperPlacement",
              type: "string",
              description: "Position of the pop-up calendar relative to the input.",
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
          ]}
        />
      </View>
    );
  }
}

DateInputView.cssClass = {
  CONTAINER: "DateInputView",
  CONFIG: "DateInputView--config",
  CONFIG_OPTIONS: "DateInputView--configOptions",
};
