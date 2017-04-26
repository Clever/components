import React, {Component} from "react";

import Example, {ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";
import View from "./View";
import {DateInput} from "src";


export default class DateInputView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
    };
  }

  render() {
    return (
      <View title="DateInput" sourcePath="src/DateInput/DateInput.jsx">
        <p>An input that allows the user to pick a date.</p>
        <Example>
          <div>
            <ExampleCode>
              <DateInput
                label="Label"
                onChange={value => this.setState({value})}
                value={this.state.value}
                min={new Date()}
              />
            </ExampleCode>
          </div>
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "label",
              type: "String",
              description: "Label for input",
              optional: true,
            },
            {
              name: "onChange",
              type: "Function",
              description: "Called when value of input changes",
              optional: true,
            },
            {
              name: "value",
              type: "Node",
              description: "Value of input",
              optional: true,
            },
            {
              name: "min",
              type: "Date",
              description: "Minimum date to allow the user to select.",
              optional: true,
            },
            {
              name: "max",
              type: "Date",
              description: "Maximum date to allow the user to select.",
              optional: true,
            },
          ]}
        />
      </View>
    );
  }
}
