import React, { PureComponent } from "react";
import View from "./View";
import { AlertBox, SegmentedControl } from "src";
import Example, { ExampleCode } from "./Example";
import PropDocumentation from "./PropDocumentation";

export default class AlertBoxView extends PureComponent {
  state = {
    type: "warning",
  };

  render() {
    const { AlertBoxOptions } = AlertBoxView;
    const { type } = this.state;

    return (
      <View title="AlertBox" sourcePath="src/AlertBox/AlertBox.tsx">
        <p>
          This is a container for prominent page-level messaging. Alerts should communicate a single
          informational message and may contain a text link if there are related actions. Temporary
          messages that are a direct result of a user interaction should display via Toast, rather
          than Alert box.
        </p>

        <Example title="AlertBox options:">
          <SegmentedControl
            onSelect={value => this.setState({ type: value })}
            options={Object.keys(AlertBoxOptions).map(n => ({
              content: n,
              value: AlertBoxOptions[n],
            }))}
            value={type}
          />

          <ExampleCode>
            <AlertBox type={type} title={`${type} box`}>
              <p>
                This is the box body. It can be any node.{" "}
                <a href="/#/components/alert-box">look a link</a>!
              </p>
            </AlertBox>
          </ExampleCode>
        </Example>

        <Example title="Closable AlertBox :">
          <ExampleCode>
            <AlertBox type="info" title="Closable info box" isClosable>
              <p>
                This is the box body. It can be any node.{" "}
                <a href="/#/components/alert-box">look a link</a>!
                <br />
                Notice that this box is closable
              </p>
            </AlertBox>
          </ExampleCode>
        </Example>

        <PropDocumentation
          availableProps={[
            {
              name: "title",
              type: "string",
              description: "Title",
              defaultValue: "",
              optional: false,
            },
            {
              name: "className",
              type: "string",
              description: "Custom class",
              defaultValue: "",
              optional: true,
            },
            {
              name: "type",
              type: "string",
              description: "One of: processing, warning, error, info, success",
              defaultValue: "",
              optional: false,
            },
            {
              name: "isClosable",
              type: "bool",
              description: "Whether the AlertBox can be dismissed",
              defaultValue: "False",
              optional: true,
            },
            {
              name: "onClose",
              type: "Function",
              description: "Called when user closes AlertBox",
              defaultValue: "None",
              optional: true,
            },
            {
              name: "children",
              type: "node",
              description: "Body",
              defaultValue: "",
              optional: false,
            },
          ]}
        />
      </View>
    );
  }
}

AlertBoxView.AlertBoxOptions = {
  PROCESSING: "processing",
  WARNING: "warning",
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};
