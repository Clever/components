import React, {Component} from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {DateInput} from "src";

export default class DateInputView extends Component {
  constructor(props) {
    super(props);
    this.state = {value: null};
  }

  render() {
    return (
      <View title="DateInput" sourcePath="src/DateInput/DateInput.jsx">
        <p>
          DateInput is an input that allows the user to select dates from a DatePicker.
        </p>
        <Example>
          <DateInput
            label="label"
            placeholder="Placeholder"
            required
            value={this.state.value}
            onChange={(value) => this.setState({value})}
          />
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
          ]}
        />
      </View>
    );
  }
}
