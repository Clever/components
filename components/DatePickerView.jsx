import React, { Component } from "react";

import Example from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import { DatePicker } from "src";

export default class DatePickerView extends Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
  }

  render() {
    return (
      <View title="DatePicker" sourcePath="src/DatePicker/DatePicker.tsx">
        <p>
          DatePickers are cards that can be used to select a date. They're thin wrappers around{" "}
          <a href="https://hacker0x01.github.io/react-datepicker" target="blank">
            react-datepicker
          </a>
          , with Clever styles applied.
        </p>
        <Example>
          <DatePicker
            onChange={(date) => this.setState({ value: date })}
            selected={this.state.value}
          />
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "className",
              type: "string",
              description: "Optional additional classname to apply.",
              optional: true,
            },
            {
              name: "selected",
              type: "Date",
              description: "Optional default date for the datepicker",
              optional: true,
            },
            {
              name: "onChange",
              type: "function",
              description: "Called when a new date is selected.",
            },
            {
              name: "minDate",
              type: "Date",
              description: "Minimum date the user can select.",
              optional: true,
            },
            {
              name: "maxDate",
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
