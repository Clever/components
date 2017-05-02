import React, {PureComponent} from "react";
import View from "./View";
import {AlertBox, SegmentedControl} from "src";
import Example, {ExampleCode} from "./Example";
import PropDocumentation from "./PropDocumentation";

export default class AlertBoxView extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      type: "warning",
    };
  }

  render() {
    const {AlertBoxOptions} = AlertBoxView;
    const {type} = this.state;

    return (
      <View title="AlertBox" sourcePath="src/AlertBox/AlertBox.jsx">
        <p>
          A set of alert boxes.
        </p>

        <Example title="AlertBox options:">
          <SegmentedControl
            onSelect={value => this.setState({type: value})}
            options={Object.keys(AlertBoxOptions).map(n => ({content: n, value: AlertBoxOptions[n]}))}
            value={type}
          />

          <ExampleCode>
            <AlertBox type={type} title={`${type} box`}>
              <p>
                This is the box body. It can be any node. <a href="/#/components/alert-box">look a link</a>!
              </p>
            </AlertBox>
          </ExampleCode>
        </Example>

        <Example title="Closable AlertBox :">
          <ExampleCode>
            <AlertBox type="info" title="Closable info box" isClosable>
              <p>
                This is the box body. It can be any node. <a href="/#/components/alert-box">look a link</a>!
              </p>
              <p>
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
              description: "One of: warning, error, info, success",
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
              name: "chrildren",
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
  WARNING: "warning",
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};
